//Simple _Factory 简单工厂模式（静态工厂方法）

//篮球基类
var Basketball = function () {
    this.intro = '篮球盛行于美国';
};
Basketball.prototype = {
    getNumber:function () {
        console.log('每个队伍需要5名队员')
    },
    getBallSize:function () {
        console.log('篮球很大');
    }
};
//足球基类
var Football = function () {
    this.intro = '足球在世界范围内都很流行';
};
Football.prototype = {
    getNumber:function () {
        console.log('每个队伍需要11名队员');
    },
    getBallSize:function () {
        console.log('足球很大');
    }
};
//网球基类
var Tennis = function () {
    this.intro = '每年都有很多的网球赛事';
};
Tennis.prototype = {
    getNumber:function () {
        console.log('每个队伍需要1名队员');
    },
    getBallSize:function () {
        console.log('篮球很小');
    }
};
//运动工厂
var SportFactory = function (name) {
    switch(name){
        case 'NBA':
            return new Basketball();
        case 'worldCup':
            return new Football();
        case 'FrenchOpen':
            return new Tennis();
    }
};
//调用
var football = SportFactory('worldCup');
console.log(football);  // { intro: '足球在世界范围内都很流行' }
console.log(football.intro); //足球在世界范围内都很流行
football.getNumber(); //每个队伍需要11名队员
football.getBallSize(); //足球很大





//登录模块
//警示框类
var LoginAlert = function (text) { 
    this.content = text;
};
LoginAlert.prototype.show = function () {
    console.log('显示警告框')
};
//确认框类
var LoginConfirm = function (text) { 
    this.content = text;
};
LoginConfirm.prototype.show = function () {
    console.log('显示确认框');
};
//提示框类
var LoginPrompt = function (text) { 
    this.content = text;
};
LoginPrompt.prototype.show = function () {
    console.log('显示提示框');
};
//登录模块工厂
var PopFactory = function(name){
    switch(name){
        case 'alert':
            return new LoginAlert('显示警告框');
        case 'confirnm':
            return new LoginConfirm('显示确认框');
        case 'prompt':
            return new LoginPrompt('显示提示框');
    }
};
//使用示例
var oAlert = new PopFactory('alert');
console.log(oAlert); //LoginAlert { content: undefined }
console.log(oAlert.content) //显示警告框
oAlert.show(); //显示警告框



//用一个对象代替多个类
function createPop(type,text) {
    var o = new Object();
    o.content = text;
    o.show = function () {
        // 显示方法
    };
    if(type == 'alert'){  //警示框差异部分
        console.log('警示: ' + text);
    }
    if(type == 'prompy'){  //提示框差异部分
        console.log('提示: ' + text)
    }
    if(type == 'confirm'){  //确认框差异部分
        console.log('确认: ' + text);
    }
    return o;
}
var userNameAlert = createPop('alert',"用户名只能是26个字母和数字");
//运行结果：警示：用户名只能是26个字母和数字
