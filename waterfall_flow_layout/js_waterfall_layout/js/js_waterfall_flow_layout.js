
//原生JavaScript实现瀑布流布局

window.onload= function(){
    waterfall('main','box');
    //模拟从后台来的数据
    var dataInt = {"data":[{"src":'24.jpg'},{"src":'25.jpg'},{"src":'26.jpg'},{"src":'27.jpg'}]};
    window.onscroll = function(){
        if(checkScrollSlide){
            var oParent = document.getElementById('main');
            //将加载的数据渲染到当前页面的尾部
            for(var i=0; i <dataInt.data.length; i++){
                var oBox = document.createElement('div'); //添加 元素节点
                oBox.className = 'box'; //添加 类名 name属性
                oParent.appendChild(oBox); //添加子元素到父元素的后面
                oPic = document.createElement('div');
                oPic.className = 'pic';
                oBox.appendChild(oPic);
                var oImg = document.createElement('img');
                oImg.src = './images/' + dataInt.data[i].src;
                oPic.appendChild(oImg);
            }
            waterfall('main','box');  //再次调用瀑布流布局
        }
    }
}

function waterfall(parent, box){
    //将main下的所有class为box的元素取出来
    var oParent = document.getElementById(parent);
    //获取parent父元素下的所有box元素
    var oBoxes = getByClass(oParent, box);
    //计算整个页面的列数（ 页面宽 / box的宽 ）
    //offsetWidth：获取元素的宽度（width + padding + border + 父级padding）
    var oBoxW = oBoxes[0].offsetWidth;
    var cols = Math.floor(document.documentElement.clientWidth / oBoxW); //获取页面宽度除以box的宽
    oParent.style.cssText = 'width:' + oBoxW*cols + 'px;margin:0 auto;'; //设置main的宽度,设置之后居中
    var hArr = []; //数组中先存的是第一行的6张图片的高度，之后存的是每一列的图片的高度
    for(var i=0; i<oBoxes.length; i++){
        if(i < cols){
            hArr.push(oBoxes[i].offsetHeight);
        }else{
            var minH = Math.min.apply(null,hArr); //apply()改变函数（方中）this的指向
            var oIndex = getMinhIndex(hArr, minH); //数组中值最小的索引
            //改变盒子的位置
            oBoxes[i].style.position = 'absolute';
            oBoxes[i].style.top = minH + 'px';
            //oBoxes[i].style.left = oBoxW * oIndex + 'px';
            oBoxes[i].style.left =  oBoxes[oIndex].offsetLeft + 'px'; //另一种方法
            //改变最小值 ： 原来的值 + 新加的图片的值
            hArr[oIndex] += oBoxes[i].offsetHeight;
        }
    }
}

//根据class获取元素(获取指定父元素下的所有子元素)
function getByClass(parent, className){
    var boxArr = [];  //用来存储取到的所有class为box元素
    var oElements = parent.getElementsByTagName('*');
    //遍历所有获取到的元素
    for(var i = 0; i<oElements.length; i++){
        if(oElements[i].className == className){
            boxArr.push(oElements[i]);
        }
    }
    return boxArr;
} 

//找出数组中的最小值的索引
function getMinhIndex(arr,val){
    for(var i in arr){
        if(arr[i] == val){
            return i;
        }
    }
}

//检查是否具备滚动加载数据块的条件 (以最后一个数据块的距离为判断条件)
function checkScrollSlide(){
    var oParent = document.getElementById('main');
    var oBoxs = getByClass(oParent,'box'); //找出最后一个元素盒子
    //找出最后一个元素盒子距离顶部的高度
    var lastBoxH = oBoxs[oBoxs.length - 1].offsetTop + Math.floor(oBoxs[oBoxs.length-1].offsetHeight / 2);
    //滚动条向下滚动的距离（上面看不见的）
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    //当前浏览器页面的可视高度
    var height = document.body.clientHeight || document.documentElement.clientHeight;
    return (lastBoxH > scrollTop + height) ? true : false;
}