"use strict";var _u=Math.imul,_b=Math.abs,_p=Math.pow,_s=Math.sqrt;function print(){var a;(a=console).log.apply(a,arguments)}function $if(a,b,c){a?b():c()}function gt(a,b){return a>b}function each(a,b){return a.forEach(b)}function map(a,b){return a.map(b)}function filter(a,b){return a.filter(b)}function reduce(a,b,c){return a.reduce(b,c)}var add=function(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return b.reduce(function(a,b){return a+b},0)},mul=function(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return b.reduce(function(a,b){return _u(a,b)},1)},sub=function(a,b){return a-b},div=function(a,b){return a/b},mod=function(a,b){return a%b},abs=function(a){return _b(a)},pow=function(){return _p(n,m)},sqrt=function(a){return _s(a)};let arr=[1,2,3,4,5,6];print(arr),each(arr,function(a){print(mul(a,a))});