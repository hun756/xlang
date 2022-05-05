const util = require('util');
const exec = util.promisify(require('child_process').exec);
const path = require('path');

async function main() {
    const fileName = process.argv[2];
    await __exec(`node parse.js ../example/${fileName}`);
    await __exec(`node codegen.js ./../example/ast/${fileName}.ast`);
    const jsFileName = "../output/" + path.basename(fileName, '.xlang') + '.js';
    await __exec(`node ${jsFileName}`);
}

async function __exec(command) {
    const result = await exec(command);
    process.stdout.write(result.stdout);
    const errLines = result.stderr.split('\n');

    for (let errLine of errLines) {
        if (errLine.match(/ExperimentalWarning: The fs.promises API is experimental/)) {
            continue;
        }
        process.stdout.write(errLine)
    }
}

main().catch(err => console.error(err.stack));