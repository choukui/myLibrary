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
        },
        /*判断是否为ie，如果是则给body添加对应的类名*/
        judegIE:function (){
            var str = window.navigator.userAgent.toLowerCase();
            var obj = document.getElementsByTagName("body")[0];
            if (str.indexOf('msie')!=-1) {
                if(str.indexOf('msie 6')!=-1){
                    obj.setAttribute("class", "ie ie6");
                }else if(str.indexOf('msie 7')!=-1){
                    obj.setAttribute("class", "ie ie7");
                }else if(str.indexOf('msie 8')!=-1){
                    obj.setAttribute("class", "ie ie8");
                }else if(str.indexOf('msie 9')!=-1){
                    obj.setAttribute("class", "ie ie9");
                }else if(str.indexOf('msie 10')!=-1){
                    obj.setAttribute("class", "ie ie10");
                }
            }
        }
    };


    //创建我的命名空间
    if(!window["_k"]){
        window["_k"] = new _k();
    }
})(this);