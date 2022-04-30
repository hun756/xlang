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
        (data) => [data[0]]
                },
    {"name": "statements", "symbols": ["_", "statement", "_", (myLexer.has("nl") ? {type: "nl"} : nl), "statements"], "postprocess": 
        (data) => [data[0], ...data[2]]
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
    {"name": "function_call", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", (myLexer.has("lparen") ? {type: "lparen"} : lparen), "_", "parameter_list", "_", (myLexer.has("rparen") ? {type: "rparen"} : rparen)], "postprocess": 
        (data) => {
            return {
                type: "function_call",
                fun_name: data[0],
                parameters:data[4],
        
            }
        }
            },
    {"name": "function_definition", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier), "_", (myLexer.has("lparen") ? {type: "lparen"} : lparen), "_", "parameter_list", "_", (myLexer.has("rparen") ? {type: "rparen"} : rparen), "_", (myLexer.has("lbracket") ? {type: "lbracket"} : lbracket), "_", (myLexer.has("nl") ? {type: "nl"} : nl), "statements", (myLexer.has("nl") ? {type: "nl"} : nl), "_", (myLexer.has("rbracket") ? {type: "rbracket"} : rbracket)], "postprocess": 
        (data) => {
            return {
                type: "function_definition",
                fun_name: data[0],
                parameters:data[4],
                body: data[11]
            }
        }
            },
    {"name": "parameter_list", "symbols": [], "postprocess": 
        () => []
                },
    {"name": "parameter_list", "symbols": ["expression"], "postprocess": 
        (data) => {
            return [data[0]];
        }
                },
    {"name": "parameter_list", "symbols": ["expression", "__", "parameter_list"], "postprocess": 
        (data) => {
            return [data[0], ...data[2]];
        }
                },
    {"name": "expression", "symbols": [(myLexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "expression", "symbols": ["literal"], "postprocess": id},
    {"name": "expression", "symbols": ["function_call"], "postprocess": id},
    {"name": "literal", "symbols": [(myLexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "literal", "symbols": [(myLexer.has("string") ? {type: "string"} : string)], "postprocess": id},
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
