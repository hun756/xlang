const fs = require('fs').promises;
const path = require('path');


const __runtime_fn = `
"use strict";/*Compiled using nearley and moojs*/var _u=Math.imul,_b=Math.abs,_p=Math.pow,_s=Math.sqrt;function print(){var n;(n=console).log.apply(n,arguments)}var add=function(){for(var n=arguments.length,r=Array(n),t=0;t<n;t++)r[t]=arguments[t];return r.reduce(function(n,r){return n+r},0)},mul=function(){for(var n=arguments.length,r=Array(n),t=0;t<n;t++)r[t]=arguments[t];return r.reduce(function(n,r){return _u(n,r)},1)},sub=function(n,r){return n-r},div=function(n,r){return n/r},mod=function(n,r){return n%r},abs=function(n){return _b(n)},pow=function(r,t){return _p(n,m)},sqrt=function(n){return _s(n)};
`

async function main() {
    const fileName = process.argv[2];
    if (!fileName) {
        console.log("Please provide a file name");
        return;
    }

    const astCode = (await fs.readFile(fileName)).toString();
    const ast = JSON.parse(astCode);
    // console.log(ast);

    const jsCode = generate(ast);
    const baseName = path.basename(fileName, ".xlang.ast");
    const jsFileName = `../output/${baseName}.js`;
    await fs.writeFile(jsFileName, jsCode);

    console.log(`Wrote : ${jsFileName}.`);
}

function generate(node) {
    if (node.type === 'program') {
        return __runtime_fn + "\n" + node.body.map(generate).join(";\n") + ";";
    } else if (node.type === 'assignment') {
        const varName = node.var_name.value;
        const value = generate(node.value);
        return `let ${varName} = ${value}`;
    } else if (node.type === 'function_call') {
        const funName = node.fun_name.value;
        const params = node.parameters.map(generate).join(", ");
        return `${funName}(${params})`;
    } else if (node.type === 'identifier') {
        return node.value;
    }  else if (node.type === 'number'){
        return String(node.value);
    }  else if (node.type === 'string'){
        return node.value;
    } else if (node.type === 'function_definition'){
        const funName = node.fun_name.value;
        const params = node.parameters.map(generate).join(", ");

        const body = node.body.map(generate).join(";\n") + ";\n";
        const indentBody = body.split("\n").map(line => "\t" + line).join("\n");
        
        return `function ${funName} (${params}) {\n${indentBody}\n}`;
    } else {
        throw new Error(`Unknown node type: ${node.type}`);
    }
}

main().catch(err => console.error(err.stack));