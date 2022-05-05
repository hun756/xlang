const util = require('util');
const exec = util.promisify(require('child_process').exec);
const path = require('path');
const colors = require('colors');

async function main() {
    const fileName = process.argv[2];
    await __exec(`node parse.js ../example/${fileName}`);
    await __exec(`node codegen.js ./../example/ast/${fileName}.ast`);
    const jsFileName = "../output/" + path.basename(fileName, '.xlang') + '.js';
    await __exec(`node ${jsFileName}`, 1);
}

colors.enable();

async function __exec(command, out = 0) {
    const result = await exec(command);
    if(out) {
        process.stdout.write("Program Executed. Output is : ".gray  + result.stdout.underline.green);        
    } else {
        process.stdout.write(result.stdout.yellow);        
    }
    const errLines = result.stderr.split('\n');

    for (let errLine of errLines) {
        if (errLine.match(/ExperimentalWarning: The fs.promises API is experimental/)) {
            continue;
        }
        process.stdout.write(errLine.underline.red + '\n');
    }
}

main().catch(err => console.error(err.stack));