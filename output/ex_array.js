
"use strict";/*Compiled using nearley and moojs*/var _u=Math.imul,_b=Math.abs,_p=Math.pow,_s=Math.sqrt;function print(){var n;(n=console).log.apply(n,arguments)}function $if(n,r,t){(n?r:t)()}function gt(n,r){return r<n}var add=function(){for(var n=arguments.length,r=Array(n),t=0;t<n;t++)r[t]=arguments[t];return r.reduce(function(n,r){return n+r},0)},mul=function(){for(var n=arguments.length,r=Array(n),t=0;t<n;t++)r[t]=arguments[t];return r.reduce(function(n,r){return _u(n,r)},1)},sub=function(n,r){return n-r},div=function(n,r){return n/r},mod=function(n,r){return n%r},abs=function(n){return _b(n)},pow=function(r,t){return _p(n,m)},sqrt=function(n){return _s(n)};

let a = [1, 2, 3, "hello", "world"];
print(a);