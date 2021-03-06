const nearley = require('nearley');
const grammar = require('./grammar');
const fs = require('fs').promises;
const path = require('path');
const { parse } = require('path');
const colors = require('colors');


async function main() {
    const filename = process.argv[2];

    if (!filename) {
        console.error('Please provide a file name..!');
        return;
    }

    const code = (await fs.readFile(filename)).toString();

    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    parser.feed(code);

    if (parser.results.length > 1) {
        console.warn("The parse tree generates multiple results..!");
        console.log(parser.results)
    } else if (parser.results.length === 0) {
        // for undefined output
        console.error("Error: Unexpected end of file...!".underline.red);
        process.exit(1);
    } else {
        const astFile = path.basename(filename) + ".ast";
        const aststr = parser.results[0];
        await fs.writeFile("../example/ast/" + astFile, JSON.stringify(aststr, null, " "));
        // console.log(parser.results[0]);

        console.log(`Wrote : ${astFile}.`);
    }
}

main().catch(err => console.error(err.stack));