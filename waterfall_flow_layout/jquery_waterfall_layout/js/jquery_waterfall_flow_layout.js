
//用jQuery实现瀑布流布局

$(window).on('load', function(){
    waterfall();
    var dataInt = {"data":[{"src":'24.jpg'},{"src":'25.jpg'},{"src":'26.jpg'},{"src":'27.jpg'}]};
    //滚动条事件
    $(window).on('scroll', function(){
        if(checkScrollSlide){
            $.each(dataInt.data, function(key,value){
                //利用jquery的两大特点：支持连缀，隐式迭代
                var oBox = $('<div>').addClass('box').appendTo($('#main'));
                var oPic = $('<div>').addClass('pic').appendTo($(oBox));                
                var oImg = $('<img>').attr('src','./images/' + $(value).attr('src')).appendTo($(oPic));
            });
        }
        waterfall();
    })
});

//实现瀑布流布局（不能滚动）
function waterfall(){
    var $boxs = $('#main>div'); //获取class为box的元素
    var w = $boxs.eq(0).outerWidth(); //outerWidth获取的宽度值包含padding border
    var cols =Math.floor($(window).width() / w ); //计算列数
    $('#main').width(w*cols).css('margin','0 auto');
    var hArr = [];
    $boxs.each(function(index,value){
        //index 索引 value是一个dom对象
        var h = $boxs.eq(index).outerHeight();
        if(index < cols){  //前cols个图片
            hArr[index] = h;
        }else{
            var minH = Math.min.apply(null,hArr);
            var minHIndex = $.inArray(minH,hArr);
            //设置从第七张之后的图片的位置
            $(value).css({ //将dom对象转换成jquery对象
                'position':'absolute',
                'top':minH  + 'px',
                'left': minHIndex*w + 'px'
            });
            hArr[minHIndex] += $boxs.eq(index).outerHeight();
        }
    });
}

//判断是否具备滚动的条件
function checkScrollSlide(){
    //获取最后一个元素
    var $lastBox = $('#main>div').last();
    var lastBoxDis = $lastBox.offset().top + Math.floor($lastBox.outerHeight() / 2);
    //获取页面滚走的距离
    var scrollTop = $(window).scrollTop();
    //获取可视页面的高度
    var documentH = $(window).height();
    return (lastBoxDis < scrollTop + documentH) ? true : false;
}