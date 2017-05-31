//Prototype 原型模式

//图片轮播类
var LoopImages = function(imgAttr, container){
    this.imgesArray = imgAttr;
    this.container = container;
    // this.createImage = function(){};
    // this.changeImage = function(){};
}
LoopImages.prototype = {
    createImage : function(){
        console.log('LoopImages createImage function');
    },
    changeImage: function(){
        console.log('LoopImages changeImage function');
    }
};

//上下滑动切换
var SlideLoopImg = function(imgAttr, container){
    LoopImages.call(this, imgAttr, container);
};
SlideLoopImg.prototype = new LoopImages();
SlideLoopImg.prototype.changeImage = function(){
    console.log('SlideLoopImg changeImage function');
}
//渐隐切换类
var FadeLoopImg = function(imgAttr, container, arrow){
    LoopImages.call(this, imgAttr, container);
    this.arrow = arrow;
};
FadeLoopImg.prototype = new LoopImages();
FadeLoopImg.prototype.changeImage = function(){
    console.log('FadeLoopImg changeImage function');
}

var fadeImg = new FadeLoopImg(
    [ '1.jpg','2.jpg','3.jpg','4.jpg'],
    'slide',
    ['left.jpg', 'right.jpg']
);

//测试用例
console.log(fadeImg.container); //slide
fadeImg.changeImage();  //FadeLoopImg changeImage function

//原型的拓展：子类和父类的额实例对象都会被继承下来
LoopImages.prototype.getImageLength = function(){
    return this.imgesArray.length;
}
LoopImages.prototype.getContainer = function(){
    return this.container;
}
console.log(fadeImg.getImageLength()); //4
console.log(fadeImg.getContainer()); //slide


//基于已经缓存的模板对象克隆出新对象的模式
function prototypeExtend(){
    var F = function(){};                 //缓存类，为实例化返回对象临时创建
    var args = arguments, i=0, len = args.length;
    for(;i<len; i++){ 
        for(var j in args[i]){            //遍历每个模板对象中的属性
            F.prototype[j] = args[i][j];  //将这些属性复制到缓存类原型中
        }
    }
    return new F(); //返回缓存类的一个实例
}
var penguin = prototypeExtend({
    speed: 20,
    swim: function(){ console.log('游泳速度 ' + this.speed); } },
    { run: function(speed){ console.log('奔跑速度 ' + speed); } },
    { jump: function(){ console.log('跳跃动作');} 
});

penguin.swim();  //游泳速度 20
penguin.run(10); //游泳速度 10
penguin.jump();  //跳跃动作