const moo = require('moo')

/** 
 * ws
 * identifier
 * number literals
 * string literals
 * assignment operator
 * left paran
 * right paran
 * new line
 * 
 * --  ** not done **
 * 
 * plus
 * minus
 * times
 * divide
 * left bracket
 * right bracket
 * colon
 * if keyword
 * else keyword
 * for keyword
 * in keyword
 * class keyword
*/

const lexer = moo.compile({
    ws:             /[ \t]+/,
    number:         { match: /0|[1-9][0-9]*/, value: Number},
    string:         /"(?:\\["\\]|[^\n"\\])*"/,
    lparen:         '(',
    rparen:         ')',
    lbracket:       '[',
    rbracket:       ']',
    // lte:            '<=',
    // lt:             '<',
    // gte:            '>=',
    // gt:             '>',
    assignmentOp:   '=',
    // opPlus:         '+',
    // opMinus:        '-',
    // opStar:         '*',
    // opDiv:          '/',
    identifier:     /[a-zA-Z_][a-zA-Z0-9_]*/,
    nl:             { match: /[\r\n]+/, lineBreaks: true }
});

module.exports = lexer;