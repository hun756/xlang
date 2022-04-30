const fs = require('fs').promises;
const lexer = require('./lexer');

async function main() {
    const code = (await fs.readFile("../example/ex1.xlang")).toString();
    // console.log(code);
    lexer.reset(code);
    let token;
    while (1) {
        token = lexer.next();
        if (token) {
            console.log(token.type, JSON.stringify(token.value));
        }
        else break;
    }
}

main().catch(err => console.log(err.stack));