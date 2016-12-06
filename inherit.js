
    //inherit.js

    //原型链继承: 利用原型让一个引用类型继承另一个引用类型的属性和方法
    function SuperType(){ //被继承的函数：超类型（父类，基类）
        this.property=true; //超类型的属性
    }
    SuperType.prototype.getSuperValue=function(){ //超类型的方法
        return this.property;
    };
    function SubType(){ //继承的函数：子类型（子类，派生类）
        this.subproperty=false; //子类型的属性
    }
    //继承superType , 通过原型链继承：超类型实例化后的对象实例赋值给子类型的原型属性
    //new superType()会将superType构造里的信息和原型里的信息都交给subType
    SubType.property = new SuperType();

    SubType.prototype.getSubValue=function(){
        return this.subproperty;
    };
    var p_chain = new SubType();
    alert(p_chain.getSuperValue()); //true

    //确定原型和实例的关系
    alert(p_chain instanceof Object); //true
    alert(p_chain instanceof SubType);//true
    alert(p_chain instanceof SubType);//true

    alert(Object.prototype.isPrototypeOf(p_chain));//true
    alert(SuperType.prototype.isPrototypeOf(p_chain));//true
    alert(SubType.prototype.isPrototypeOf(p_chain));//true


    //借用构造函数继承（对象冒充）: 在子类型构造函数的内部调用超类型的构造偶函数（只能继承构造里的信息）
    function SuperType(name){
        this.name=name;
        this.colors=["red","blue","green"];
    }
    function SubType(){
        SuperType.call(this,"Cynthia"); //对象冒充：给超类型传参
        this.age=20;
    }
    var p_chain1 = new SubType();
    p_chain1.colors.push("black");
    alert(p_chain1.colors); //red,blue,green,black

    var p_chain2 = new SubType();
    alert(p_chain2.colors);//red,blue,green
    var p_chain3 = new SubType();
    alert(p_chain3.name); //Cynthia
    alert(p_chain2.age); //20


    //组合继承：将原型链和借用构造函数的技术组合在一块
    function SuperType(name){
        this.name=name; //属性
        this.colors=["red","blue","green"];
    }
    SuperType.prototype.run1=function(){ //原型的方法
        alert(this.name);
    };
    function SubType(name,age){
        SuperType.call(this,name); //(继承属性)对象冒充：给超类型传参
        this.age=age;
    }
    SubType.prototype = new SuperType(); //（继承方法）原型链继承
    SubType.prototype.constructor=SubType;

    SubType.prototype.run2=function(){
        alert(this.age);
    };

    var p_chain1 = new SubType("Cynthia",20);
    p_chain1.colors.push("black");
    alert(p_chain1.colors); ////red,blue,green,black
    p_chain1.run1(); //Cynthia
    p_chain1.run2(); //20

    var p_chain2 = new SubType("Katie",21);
    alert(p_chain2.colors); ////red,blue,green
    p_chain2.run1(); //Katie
    p_chain2.run2(); //21


    //原型式继承:借助原型基于已有的对象创建新对象，同事不必创建自定义类型
    function object(o){ //临时中专函数
        function F(){}
        F.prototype = o; //F构造是一个临时新建的对象，用来储存传递过来的对象
        return new F();
    }
    //字面量对象声明，相当于 var person = new Person();
    var person = {
        name:"Cynthia",
        friends:["Morning","Katie","Teddy"]
    };
    var anotherPerson = object.create(person);  //anotherPerson 就相当于 new F()
    anotherPerson.name = "Bear";
    anotherPerson.friends.push("Alinax");
    alert(person.name); //Cynthia
    alert(person.friends); //Moring,Katie,Teddy,Alinax

    var yetAnotherPerson = object.create(person);
    yetAnotherPerson.name="Ying";
    yetAnotherPerson.friends.push("xie");
    alert(person.name); //Cynthia
    alert(person.friends); //Moring,Katie,Teddy,Alinax,xie (引用类型的属性共享了)


    //寄生式继承（原型式继承 + 工厂模式）：创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，
    //最后再像真的是它做了所有工作一样返回对象
    function object(o){//原型式继承
        function F(){}
        F.prototype=o;
        return new F();
    }
    function createAnother(original){ //寄生函数
        var clone = object(original);
        clone.run = function(){
            alert("Hi,this is parastitic inheritance !");
        }
        return clone;
    }
    var person = {
        name:"Cynthia",
        friends:["Morning","Katie","Teddy"]
    };
    var anotherPerson = createAnother(person);
    anotherPerson.run(); //Hi,this is parastitic inheritance !


    //寄生组合式继承：通过借用构造函数继承属性，通过原型链混成形式来继承方法
    function object(o){ //临时中转函数
        function F(){}
        F.prototype=o;
        return new F();
    }
    function create(box,desk){//寄生式继承函数
        var f = object(box.prototype);
        f.constructor=desk;
        desk.prototype=f;
    }
    function Box(name,age){
        this.name=name;
        this.age=age;
    }
    Box.prototype.run = function(){
        return this.name + this.age + ", Now is going on !"
    }
    function Desk(name,age) {
        Box.call(this,name,age); //对象冒充
    }
    //通过寄生组合继承来实现继承
    create(Box,Desk); //替代了 Desk.prototype = new Box();
    var desk = new Desk('Cynthia',20);
    alert(desk.run()); //Cynthia20, Now is going on !
