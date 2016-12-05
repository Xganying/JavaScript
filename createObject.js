 
 // createObject.js

    //工厂模式：解决实例化对象产生大量重复的问题
    function createPerson(name,age,job){
        var o = new Object(); //创建要返回的对象
        o.name=name;
        o.age=age;
        o.job=job;
        o.run=function(){
            alert(this.name);
        };
        return o; //返回对象引用
    }
    var person1 = new createPerson("Cynthia",20,"student"); //创建对象
    var person2 = new createPerson("Morning",20,"FE");
    alert(person1.name); //Cynthia
    alert(person2.name); //Morning



    //构造函数模式
    function Person(name,age,job){
        this.name=name; //实例属性
        this.age=age;
        this.job=job;
        this.run = function(){  //实例方法
            alert(this.name);
        }
    }
    var person1 = new Person("Cynthia",20,"student"); //实例化
    alert(person1.name); //Cynthia
    alert(person1.constructor);



    //原型模式(一般写法)
    function Person(){} //声明一个构造函数
    Person.prototype.name="Cynthia"; //原型属性
    Person.prototype.age=20;
    Person.prototype.job="student";
    Person.prototype.run=function(){  //原型方法
        alert(this.name);
    };
    var person1 = new Person();
    person1.run(); //Cynthia（来自原型）
    var person2 = new Person();
    person2.run(); //Cynthia（来自原型）
    alert(person1.run == person2.run); //true
    person1.name="Morning";
    person1.run(); //Morning（来自实例）
    delete person1.name;  //删除实例中的属性
    person1.run(); //Cynthia（来自原型）



    //简单的原型语法
    function Person(){}
    //使用字面量方向创建原型对象， {}相当于对象，即Object
    Person.prototype={
        constructor:Person, //强制指向Person
        name:"Cynthia", //原型属性
        age:20,
        job:"student",
        run:function(){  //原型方法
            alert(this.name);
        }
    };
    var person = new Person(); //创建一个对象实例
    alert(person instanceof Object); //true
    alert(person instanceof Person); //true
    alert(person.constructor == Person); //true
    alert(person.constructor == Object); //false



    //组合使用：构造函数+原型模式
    function Person(name,age,job){ //不共享的使用构造函数
        this.name=name; //实例属性
        this.age=age;
        this.job=job;
        this.friends=["Cynthia","Morning","Katie"];
    }
    Person.prototype= { //共享的使用原型模式
        constructor: Person,
        run:function(){
            alert(this.name);
        }
    }
    var person1 = new Person("Cynthia",20,"student");
    var person2 = new Person("Morning",21,"FE");
    person1.friends.push("Ying");
    alert(person1.friends); //Cynthia,Morning,Katie,Ying
    alert(person2.friends); //Cynthia,Morning,Katie
    alert(person1.friends == person2.friends); //false
    alert(person1.run == person2.run); //true



    //动态原型模式
    function Person(name,age,job){ //将原型封装到构造函数里面
        this.name=name; //实例属性
        this.age=age;
        this.job=job;
        this.friends=["Cynthia","Morning","Katie"];
        if(typeof this.run != "function"){
            Person.prototype.run = function(){
                alert(this.name);
            }
        }
    }
    var person = new Person("Cynthia",20,"student");
    person.run(); //Cynthia



    //寄生构造函数模式：工厂模式+构造函数
    function Person(name,age,job){
        var o = new Object(); //创建要返回的对象
        o.name=name;
        o.age=age;
        o.job=job;
        o.run=function(){
            alert(this.name);
        }
        return o;
    }
    var person = new Person("Cynthia",20,"student");
    person.run(); //Cynthia



    //稳妥构造函数模式
    function Person(name,age,job){
        var o = new Object(); //创建要返回的对象
        //可在此定义私有变量和方法
        o.name=name;
        o.age=age;
        o.job=job;

        o.run=function(){ //添加方法
            alert(this.name);
        }
        return o;
    }
    var person = new Person("Cynthia",20,"student");
    person.run(); //Cynthia