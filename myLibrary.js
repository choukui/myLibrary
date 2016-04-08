/**
 * Created by Administrator on 2016/4/7 0007.
 */
"use strict";
(function(){

    var _k = function(){};

    var porto = _k.prototype;

    _k.prototype = {
        max : function(array){
            var newArr = [];
            for (var i = 0; i < array.length; i++){
                if ( !isNaN(array[i]) ){
                    newArr.push(array[i]);
                }
            }
            var max = newArr[0];
            for (var i = 0; i < newArr.length; i++){
                if (newArr[i] > max){
                    max = newArr[i];
                }
            }
            return max;
        },
        getCss:function (obj, prop) {
            if (obj.currentStyle) {
                return obj.currentStyle[prop];
            }
            else if (window.getComputedStyle) {
                return document.defaultView.getComputedStyle (obj,null)[prop];
            }
            return null;
        }
    };


    //创建我的命名空间
    //创建我的命名空间
    if(!window["_k"]){
        window["_k"] = new _k();
    }
})(this);