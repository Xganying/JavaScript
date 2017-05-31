// Factory Methodv 工厂方法模式


//安全模式创建的工厂类
var Factory = function(type,content){
    if(this instanceof Factory){
        var s = new this[type](content);
        return s;
    }else{
        return new Factory(type,content);
    }
}
//学科类工厂： 在工厂原型中设置创建所有类型数据对象的基类
Factory.prototype = {
    Java: function(content){
        this.content = content; //将内容保存在content里面，以备后用
        (function(content){     //创建对象时，通过闭包直接执行，将内容按需求的样式插入到页面内
            var div = document.createElement('div');
            div.innerHTML = content;
            div.style.color = 'green';
            document.getElementById('container').appendChild(div);
        })(content);
    },
    JavaScript: function(content){
        this.content = content; 
        (function(content){    
            var div = document.createElement('div');
            div.innerHTML = content;
            div.style.color = 'pink';
            document.getElementById('container').appendChild(div);
        })(content);
    },
    UI: function(content){
        this.content = content;
        (function(content){
            var div = document.createElement('div');
            div.innerHTML = content;
            div.style.border = '1px solid red';
            document.getElementById('container').appendChild(div);
        })(content);
    },
    PHP:function(content){
        this.content = content; 
        (function(content){ 
            var div = document.createElement('div');
            div.innerHTML = content;
            div.style.color = 'yellow';
            div.style.background = 'red';
            document.getElementById('container').appendChild(div);
        })(content);
    }
};

function Factory(type, content){
    switch(type){
        case 'Java':
            return new Java(content);
        case 'PHP':
            return new PHP(content);
        case 'javascript':
            return new JavaScript(content);
        case 'UI':
            return new JavaScript(content);
    }
}

//数据
var data = [
    {type:'JavaScript', content:"this is JavaScript"},
    {type:'UI', content:"this is UI"},
    {type:'PHP', content:"this is PHP"},
    {type:'Java', content:"this is Java"}
];

// 使用
for(var i = data.length; i>0; i--){
    Factory(data[i].type, data[i].content);
}

