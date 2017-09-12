// 数组扁平化和去重

// 数组扁平化

    function Flat1(arr){
        return [].concat.apply([],arr);
    }

    function Flat2(arr){
        var newArr = arr.reduce(function(pre, cur){
            return pre.concat(cur)
        });
        return newArr;
    }

    function Flat3(arr){
        var newArr =[];
        for(var i= 0; i < arr.length; i++){
            for(var j=0; j < arr[i].length; j++){
                newArr.push(arr[i][j]);
            }
        }
        return newArr;
    }
    
    function Flat4(arr){ // es6
        return [].concat(...arr);
    }

    function Flat5(arr){   // 扁平化多层嵌套数组
        var newArr =[];
        for(var i= 0; i < arr.length; i++){
            if(arr[i] instanceof Array){
                newArr = newArr.concat(Flat5(arr[i]));
                // newArr.push.apply(newArr, Flat5(arr[i]));
            }else{
                newArr.push(arr[i]);
            }
        }
        return newArr;
    }

    // es6
    const Flat6 = arr => arr.reduce((a, b) => a.concat(Array.isArray(b) ? Flat6(b) : b), []); 
    
    // es5
    var Flat7 = function (arr){
        return arr.reduce(function(a,b){
            return a.concat(Array.isArray(b)? Flat7(b):b)
        },[]);
    }

    // 测试
    var arr1 = [[1, 2],[3, 4, 5], [6, 7, 8, 9]];
    console.log(Flat1(arr1)); // (9) [1,2,3,4,5,6,7,8,9]
    console.log(Flat2(arr1)); // (9) [1,2,3,4,5,6,7,8,9]
    console.log(Flat3(arr1)); // (9) [1,2,3,4,5,6,7,8,9]
    console.log(Flat4(arr1)); // (9) [1,2,3,4,5,6,7,8,9]
    console.log(Flat5(arr1)); // (9) [1,2,3,4,5,6,7,8,9]
    console.log(Flat6(arr1)); // (9) [1,2,3,4,5,6,7,8,9]
    console.log(Flat7(arr1)); // (9) [1,2,3,4,5,6,7,8,9]

    var arr2 = [[1,2,2],[3, 4, 5, 5],[6, 7, 8, 9,[11,12,[12,13,[14]]]],10];
    console.log(Flat1(arr2)); // (13) [1, 2, 2, 3, 4, 5, 5, 6, 7, 8, 9, Array(3), 10]
    console.log(Flat2(arr2)); // (13) [1, 2, 2, 3, 4, 5, 5, 6, 7, 8, 9, Array(3), 10]
    console.log(Flat3(arr2)); // (13) [1, 2, 2, 3, 4, 5, 5, 6, 7, 8, 9, Array(3)]
    console.log(Flat4(arr2)); // (13) [1, 2, 2, 3, 4, 5, 5, 6, 7, 8, 9, Array(3), 10]
    console.log(Flat5(arr2)); // (17) [1, 2, 2, 3, 4, 5, 5, 6, 7, 8, 9, 11, 12, 12, 13, 14, 10]
    console.log(Flat6(arr2)); // (17) [1, 2, 2, 3, 4, 5, 5, 6, 7, 8, 9, 11, 12, 12, 13, 14, 10]
    console.log(Flat7(arr2)); // (17) [1, 2, 2, 3, 4, 5, 5, 6, 7, 8, 9, 11, 12, 12, 13, 14, 10]

// 数组去重

    //方法一：新建一个数组用来存放结果，遍历原数组，每次从其中取出一个元素和结果数组进行比较，
    //       如果原数组中元素没有在结果数组中出现过，就将这个元素保存到结果数组中。
    function unique1_origin(arr){
        var uniqueArr = []; // 保存结果的数组
        for(var i=0; i<arr.length; i++){ // 遍历原数组
            for(var j=0; j<uniqueArr.length; j++){
                if(uniqueArr[j] === arr[i]){ // 在结果数组中，遍历的将从原数组取出的元素比较结果数组中的元素比较
                    break;
                }
            }
            if( j === uniqueArr.length){ 
                uniqueArr.push(arr[i]); // 不同，则保存到结果数组中
            }
        }
        return uniqueArr;
    }
    // 改进一：由于上面的方法，很明显时间复杂度是：O(n^2),所以可以进行改进
    function unique1(arr){ 
        var uniqueArr = []; 
        for(var i=0; i<arr.length; i++){ 
            if(uniqueArr.indexOf(arr[i]) == -1){ 
                uniqueArr.push(arr[i]); 
            }
        }
        return uniqueArr;
    }
    // 改进二：继续简化写法
    function unique1_simple(arr){
        var uniqueArr = arr.filter(function(item, index, array){
            return array.indexOf(item) === index;
        });
        return uniqueArr;
    }

    // 方法二：利用对象字面量的key和value关联性,新建一个对象和数组,遍历传入数组时,判断值是否为js对象的键,不是的话给对象新增该键并放入新数组。
    // 特  点：速度快，但是需要占用内存相对大一点。
    // 注  意：判断是否为js对象键时，会自动对传入的键执行“toString()”，不同的键可能会被误认为一样。
    function unique2_origin(arr){
        var obj = {};
        var uniqueArr = []; // 结果数组
        var type; // 记录元素的数据类型
        for(var i=0; i<arr.length; i++){
            type = typeof arr[i];
            if( !obj[arr[i]]){
                obj[arr[i]] = [type];
                uniqueArr.push(arr[i]);
            }else if(obj[arr[i]].indexOf(type) < 0){
                obj[arr[i]].push(type);
                 uniqueArr.push(arr[i]);
            }
        }
        return uniqueArr;
    }
    function unique2(arr){
         var uniqueArr = [];
         var obj = {};
         for(var i=0; i<arr.length; i++){
             var key = typeof(arr[i]) + arr[i];
             if( obj[key] !== 1){
                 uniqueArr.push(arr[i]);
                 obj[key] = 1;
             }
         }
         return uniqueArr;
    }
    
    // 方法三: 先将原数组排序，然后依次比较前后两个元素是否相等，不相等就将元素存入到结果数组中
    function unique3(arr){
        arr.sort();  // 先排序
        var uniqueArr = [arr[0]]; // 结果数组
        for(var i=1; i<arr.length; i++){
            if(arr[i] !== uniqueArr[uniqueArr.length -1] ){
                uniqueArr.push(arr[i]);
            }
        }
        return uniqueArr;
    }
    
    // 方法四: 利用数组下标判断，遍历原数组，如果当前数组的第i项在当前数组中第一次出现的位置不是i，
    //        那么表示第i项是重复的，忽略掉，否则存入结果数组。
    function unique4(arr){
        var uniqueArr = [arr[0]]; //结果数组
        for(var i=1; i<arr.length; i++){ //从第二项开始遍历原数组
            if(arr.indexOf(arr[i]) == i){  //如果当前数组的第i项在当前数组中第一次出现的位置不是i，那么表示第i项是重复的，忽略掉。否则存入结果数组
                uniqueArr.push(arr[i]);
            }
        }
        return uniqueArr;
    }

    // 将数组去重的方法添加到原型上
    // 方法一
    Array.prototype.p_unique1 = function(){
        var res = [];
        for(var i = 1; i < this.length; i++){
           if(res.indexOf(this[i]) == -1){ 
                res.push(this[i]); 
            }
        }
        return res;
    }
    // 方法二
    Array.prototype.p_unique2 = function(){
        var res = [];
        var obj = {};
        for(var i = 0; i < this.length; i++){
            var key = typeof(this[i]) + this[i];
            if(!obj[key]){
                res.push(this[i]);
                obj[key] = 1;
            }
        }
        return res;
    } 
    // 方法三
    Array.prototype.p_unique3 = function(){
        this.sort();	
        var res = [this[0]];
        for(var i = 1; i < this.length; i++){
            if(this[i] !== res[res.length - 1]){
                res.push(this[i]);
            }
        }
        return res;
    }
    // 方法四
    Array.prototype.p_unique4 = function(){
        var res = [this[0]];
        for(var i=1; i<this.length; i++){
            if(this.indexOf(this[i]) == i){
                res.push(this[i]);
            }
        }
        return res;
    }

    var arr1 = [1, 2, '13', 1, '5', '9', 1, 12, 12, 2, '5', 13, 'e', 'e', 'a', 'a', 'b', 'd',13];
    
    console.log("方法一：") // 结果都是: (11) [1, 2, "13", "5", "9", 12, 13, "e", "a", "b", "d"]
    console.log(unique1_origin(arr1));
    console.log(unique1(arr1));
    console.log(unique1_simple(arr1));

    console.log("方法二：")
    console.log(unique2_origin(arr1));
    console.log(unique2(arr1));

    console.log("方法三：")
    console.log(unique3(arr1));

    console.log("方法四：")
    console.log(unique4(arr1));
    
    console.log("在Array原型上将方法实现: ")
    console.log(arr1.p_unique1());
    console.log(arr1.p_unique2());
    console.log(arr1.p_unique3());
    console.log(arr1.p_unique4());