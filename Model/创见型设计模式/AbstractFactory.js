// AbstractFacotry 抽象工厂模式

//创建抽象工厂方法
var VehicleFactory = function(subType, superType){
    //判断抽象工厂中是否有该抽象类
    if(typeof VehicleFactory[superType] === 'function'){
        function F(){};                                  //缓存类
        F.prototype = new VehicleFactory[superType]();  //继承父类属性和方法
        subType.constructor = subType;                  //将子类的constructor指向子类
        subType.prototype = new F();                    //子类原型继承父类
    }else{
        throw new Error('未创建该抽象类!');              //不存在该抽象类时抛出错误
    }
}
//小汽车抽象类
VehicleFactory.Car = function(){
    this.type = 'car';
};
VehicleFactory.Car.prototype = {
    getPrice : function(){
        return new Error('抽象方法不能调用!');
    },
    getSpeed: function(){
        return new Error('抽象方法不能调用!');
    }
};
//公交车抽象类
VehicleFactory.Bus = function(){
    this.type = 'bus';
};
VehicleFactory.Bus.prototype = {
    getPrice : function(){
        return new Error('抽象方法不能调用!');
    },
    getPassengerNum: function(){
        return new Error('抽象方法不能调用!');
    }
};
//货车抽象类
VehicleFactory.Trunk = function(){
    this.type = 'trunk';
};
VehicleFactory.Trunk.prototype = {
    getPrice : function(){
        return new Error('抽象方法不能调用!');
    },
    getTrainload: function(){
        return new Error('抽象方法不能调用!');
    }
};
//宝马汽车子类
var BMW = function(price, speed){
    this.price = price;
    this.speed = speed;
};
//抽象工厂实现对Car抽象类的继承
VehicleFactory(BMW, 'Car');
BMW.prototype.getPrice = function(){
    return this.price;
}
BMW.prototype.getSpeed = function(){
    return this.speed;
}
//兰博基尼汽车子类
var Lamborghini = function(price, speed){
    this.price = price;
    this.speed = speed;
};
VehicleFactory(Lamborghini, 'Car');
Lamborghini.prototype.getPrice = function(){
    return this.price;
}
Lamborghini.prototype.getSpeed = function(){
    return this.speed;
}
//宇通汽车子类
var YUTONG = function(price, speed){
    this.price = price;
    this.speed = speed;
};
VehicleFactory(YUTONG, 'Car');
YUTONG.prototype.getPrice = function(){
    return this.price;
}
YUTONG.prototype.getSpeed = function(){
    return this.speed;
}
//奔驰汽车子类
var BenzTrunk = function(price, trainLoad){
    this.price = price;
    this.trainLoad = trainLoad;
};
VehicleFactory(BenzTrunk, 'Trunk');
BenzTrunk.prototype.getPrice = function(){
    return this.price;
}
BenzTrunk.prototype.getTrainload = function(){
    return this.price;
}
// 测试示例
var trunk = new BenzTrunk(100000000, 1000);
console.log(trunk.getPrice()); //100000000
console.log(trunk.type); //trunk

