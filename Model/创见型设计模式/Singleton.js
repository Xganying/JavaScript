// Singleton 单利模式

var Conf = (function(){
    var conf = {
        MAX_NUM: 100,
        MIN_NUM: 1,
        COUNT:1000
    }
    return{
        get: function(name){
            return conf[name] ? conf[name] : null;
        }
    }
})();
var count = Conf.get('COUNT');
console.log(count); // 1000

//惰性载入单例
var LazySingle = (function(){
    var instance = null; //单例实例引用
    function Single(){ //单例
        /*在这里定义使用属性和方法*/
        return {
            publicMethod : function(){},
            publicProperty: '1.0'
        }
    }
    return function(){    //获取单例对象的借口
        if( !instance ){  //如果是创建单例将创建单例
            instance = Single();
        }
        return instance;  //返回单例
    }
})();
console.log(LazySingle().publicProperty); //结果： 1.0