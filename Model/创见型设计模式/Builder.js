//Bulider 建造者模式

//创建一个Human类
var Human = function(param){
    this.skill = param && param.shill || '保密';
    this.hobby = param && pram.hobby || '爱好';
}
Human.prototype = {
    getSkill: function(){
        return this.shill;
    },
    getHobby :function(){
        return this.hobby;
    }
};
//实例化创建的姓名类
var Named = function(name){
    var oThis = this;
    (function(name, oThis){
        oThis.wholeName = name;
        if(name.indexOf(' ') > -1){
            oThis.FirstName = name.slice(0, name.indexOf(' '));
            oThis.secondName = name.slice(name.indexOf(' '));
        }
    })(name, oThis);
}
//实例化创建的工作类
var Work = function(work){
    var oThis = this;
    (function(work, oThis){
        switch(work){
            case 'code': 
                oThis.work = '工程师';
                oThis.workDescript = '每天沉溺于编程';
                break;
            case 'UI': 
                oThis.work = '设计师';
                oThis.workDescript = '想象力无比丰富';
                break;
            case 'UE': 
                oThis.work = '设计';
                oThis.workDescript = '设计更似一种艺术';
                break;
            case 'teach': 
                oThis.work = '教师';
                oThis.workDescript = '分享是一种快乐';
                break;
            default:
                oThis.work = work;
                oThis.workDescript = '抱歉，还未找到您所选择的职位的描述'
        }
    })(work, oThis);
}
//更改期望的职位
Work.prototype.changeDescript =  function(work){
    this.work = work;
}
//添加对职位的描述
Work.prototype.changeDescript = function(sentence){
    this.workDescript = sentence;
}

//创建完整的对象
var Person = function(name, work){
    var person = new Human();       //创建应聘者缓存对象
    person.name = new Named(name);  //创建应聘者姓名解析对象
    person.work = new Work(work);   //创建应聘者期望职位
    return person;                  //返回应聘者对象
}
var person = new Person('Cynthia xie','code');
console.log(person.skill);                  //保密
console.log(person.name.FirstName);         //Cynthia
console.log(person.work.work);              //工程师
console.log(person.work.workDescript);      //每天沉溺于编程
person.work.changeDescript('更改职位描述');
console.log(person.work.workDescript);      //更改职位描述