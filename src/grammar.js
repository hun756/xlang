// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

    const myLexer = require("./lexer");
var grammar = {
    Lexer: myLexer,
    ParserRules: [
    {"name": "program", "symbols": ["statements"], "postprocess":   
        (data) => {
            return {
                type: "program",
                body: data[0]
            }
        }
                },
    {"name": "statements", "symbols": [], "postprocess": 
        () => []
                },
    {"name": "statements", "symbols": ["_", "statement", "_"], "postprocess": 
        (data) => [data[1]]
                },
    {"name": "statements", "symbols": ["_", "statement", "_", (myLexer.has("nl") ? {type: "nl"} : nl), "statements"], "postprocess": 
        (data) => [data[1], ...data[4]]
                },
    {"name": "statement", "symbols": ["assignment"], "postprocess": id},
    {"name": "statement", "symbols": ["function_call"], "postprocess": id},
    {"name": "statement", "symbols": ["function_definition"], "postprocess": id},
    {"name": "assignment", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", (myLexer.has("assignmentOp") ? {type: "assignmentOp"} : assignmentOp), "_", "expression"], "postprocess": 
        (data) => {
            return {
                type: "assignment",
                var_name: data[0],
                value: data[4]
            }
        }
            },
    {"name": "function_call", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", (myLexer.has("lparen") ? {type: "lparen"} : lparen), "_", "expression_list", "_", (myLexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess": 
        (data) => {
            return {
                type: "function_call",
                fun_name: data[0],
                parameters:data[4],
        
            }
        }
            },
    {"name": "function_definition", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", (myLexer.has("lparen") ? {type: "lparen"} : lparen), "_", "expression_list", "_", (myLexer.has("rparen") ? {type: "rparen"} : rparen), "_", "code_block"], "postprocess": 
        (data) => {
            return {
                type: "function_definition",
                fun_name: data[0],
                parameters:data[4],
                body: data[8]
            }
        }
            },
    {"name": "code_block", "symbols": [(myLexer.has("lbracket") ? {type: "lbracket"} : lbracket), "_", (myLexer.has("nl") ? {type: "nl"} : nl), "statements", (myLexer.has("nl") ? {type: "nl"} : nl), "_", (myLexer.has("rbracket") ? {type: "rbracket"} : rbracket)], "postprocess": 
        (data) => {
            return {
                type: "code_block",
                statements: data[3],
            }
        }
                },
    {"name": "code_block", "symbols": [(myLexer.has("lbracket") ? {type: "lbracket"} : lbracket), "_", "code_block_parameters", "_", (myLexer.has("nl") ? {type: "nl"} : nl), "statements", (myLexer.has("nl") ? {type: "nl"} : nl), "_", (myLexer.has("rbracket") ? {type: "rbracket"} : rbracket)], "postprocess": 
        (data) => {
            return {
                type: "code_block",
                parameters: data[2],
                statements: data[5],
            }
        }
                },
    {"name": "code_block_parameters", "symbols": [(myLexer.has("bar") ? {type: "bar"} : bar), "_", "expression_list", "_", (myLexer.has("bar") ? {type: "bar"} : bar)], "postprocess": 
        (data) => {
            return data[2];
        }
                },
    {"name": "expression_list", "symbols": ["expression"], "postprocess": 
        (data) => {
            return [data[0]];
        }
                },
    {"name": "expression_list", "symbols": ["expression", "__", "expression_list"], "postprocess": 
        (data) => {
            return [data[0], ...data[2]];
        }
                },
    {"name": "expression", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "expression", "symbols": ["literal"], "postprocess": id},
    {"name": "expression", "symbols": ["function_call"], "postprocess": id},
    {"name": "expression", "symbols": ["code_block"], "postprocess": id},
    {"name": "expression", "symbols": ["array_literal"], "postprocess": id},
    {"name": "literal", "symbols": [(myLexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "literal", "symbols": [(myLexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "array_literal", "symbols": [(myLexer.has("lbrace") ? {type: "lbrace"} : lbrace), "_", "expression_list", "_", (myLexer.has("rbrace") ? {type: "rbrace"} : rbrace)], "postprocess": 
        (data) => {
            return {
                type: "array_literal",
                items: data[2]
            }
        }
                },
    {"name": "array_literal", "symbols": [(myLexer.has("lbrace") ? {type: "lbrace"} : lbrace), "_", (myLexer.has("rbrace") ? {type: "rbrace"} : rbrace)], "postprocess": 
        () => {
            return {
                type: "array_literal",
                items: []
            }
        }
                },
    {"name": "_", "symbols": []},
    {"name": "_", "symbols": ["__"]},
    {"name": "__", "symbols": [(myLexer.has("ws") ? {type: "ws"} : ws)]}
]
  , ParserStart: "program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
