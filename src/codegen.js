const fs = require('fs').promises;
const path = require('path');
const minify = require('babel-minify');

const __runtime_fn = `
"use strict";

var _u = Math.imul,
    _b = Math.abs,
    _p = Math.pow,
    _s = Math.sqrt;

function print() {
  var _console;

  (_console = console).log.apply(_console, arguments);
}

function $if(cond, consequent, alternate) {
  if (cond) {
    return consequent();
  } else {
    return alternate();
  }
}

function gt(m, n) {
  return m > n;
}

function each(arr, fun) {
  return arr.forEach(fun);
}

function map(arr, fun) {
  return arr.map(fun);
}

function filter(arr, fun) {
  return arr.filter(fun);
}

function reduce(arr, fun, initValue) {
  return arr.reduce(fun, initValue);
}

function eq(one, other) {
    return one === other;
}

var add = function add() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.reduce(function (sum, num) {
    return sum + num;
  }, 0);
};
var mul = function mul() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return args.reduce(function (sum, num) {
    return _u(sum, num);
  }, 1);
};
var sub = function sub(x, y) {
  return x - y;
};
var div = function div(x, y) {
  return x / y;
};
var mod = function mod(x, y) {
  return x % y;
};
var abs = function abs(n) {
  return _b(n);
};
var pow = function pow(b, e) {
  return _p(n, m);
};
var sqrt = function sqrt(n) {
  return _s(n);
};
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

    let { code, map } = minify(jsCode, {
        mangle: {
            keepClassName: true
        }
    });

    const baseName = path.basename(fileName, ".xlang.ast");
    const jsFileName = `../output/${baseName}.js`;
    await fs.writeFile(jsFileName, code);

    console.log(`Wrote : ${jsFileName}.`);
}

function generate(node) {
    if (node.type === 'program') {
        return __runtime_fn + node.body.map(generate).join(";\n") + ";";
    } else if (node.type === 'assignment') {
        const varName = node.var_name.value;
        const value = generate(node.value);
        return `let ${varName} = ${value}`;
    } else if (node.type === 'function_call') {
        const sourceFunName = node.fun_name.value;
        const funName = sourceFunName === "if" ? "$if" : sourceFunName;

        const params = node.parameters.map(generate).join(", ");
        return `${funName}(${params})`;
    } else if (node.type === 'identifier') {
        return node.value;
    } else if (node.type === 'number') {
        return String(node.value);
    } else if (node.type === 'string') {
        return node.value;
    } else if (node.type === 'function_definition') {
        return generateFunction(node.body.statements, node.parameters);
    } else if (node.type === "code_block") {
        return generateFunction(node.statements, node.parameters);
    } else if (node.type === "array_literal") {
        const items = node.items.map(generate).join(", ");
        // return `new Array(${items})`;
        return `[${items}]`;
    } else {
        throw new Error(`Unknown node type: ${node.type}`);
    }
}

function generateFunction(statements, parameters) {
    const body = statements.map((statement, idx) => {
        const js = generate(statement);
        if (idx === statements.length - 1) {
            return `return ${js}`;
        } else {
            return js;
        }
    }).join(";\n") + ";\n";
    const indentBody = body.split("\n").map(line => "\t" + line).join("\n");
    const params = parameters.map(generate).join(", ");
    return `function (${params}) {\n${indentBody}\n}`;
}

main().catch(err => console.error(err.stack));