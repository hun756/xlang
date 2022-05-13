# xlang
## Language written using nearley and moo js. Input generates runnable javascript code.

#### Statements:
```
n = 4
print(n)
m = 4 + 5 * 6
```

#### Funcitons:
```
doIt(n m o) [
    a_block = [
        print("Here is a block..!")
    ]

    if(n > 4
        [
            print("n is greater than 4" 4 5)
        ]
        [
            print("n is less than 4")
        ]
    )

    for n in arr [
        print("n is " n)
    ]
    print(n)
]
```

#### Control Statements:
```
n = 10
if (n > 7) [
    print("Its too big..")
] [
    print("Its fine..")
])
```

#### Array and Dictionaries:
```
arr = { 1 2 3 4 }

dict = {
    1:2     1:2
    3:4     3:4
    5:6     5:6
}
```

#### Classes:
```
class Jam [
    new (blah) [

    ]

    spread(a b c) [
        
    ]
]
```

Example code snippet:
```
a = { 1 2 { 4 5 6 } { 7 8 9 } "hello" "world" }
print(a)

newArr = each(a [
    print("hello")
])
```
Generated Ouput is :
```js
"use strict";var _u=Math.imul,_b=Math.abs,_p=Math.pow,_s=Math.sqrt;function print(){var a;(a=console).log.apply(a,arguments)}function $if(a,b,c){a?b():c()}function gt(a,b){return a>b}function each(a,b){return a.forEach(b)}function map(a,b){return a.map(b)}function filter(a,b){return a.filter(b)}function reduce(a,b,c){return a.reduce(b,c)}var add=function(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return b.reduce(function(a,b){return a+b},0)},mul=function(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return b.reduce(function(a,b){return _u(a,b)},1)},sub=function(a,b){return a-b},div=function(a,b){return a/b},mod=function(a,b){return a%b},abs=function(a){return _b(a)},pow=function(){return _p(n,m)},sqrt=function(a){return _s(a)};let a=[1,2,[4,5,6],[7,8,9],"hello","world"];print(a);let newArr=each(a,function(){print("hello")});
```