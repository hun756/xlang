// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
  function id(x) { return x[0]; }

  const myLexer = require("./lexer");
  var grammar = {
    Lexer: myLexer,
    ParserRules: [
      {
        "name": "statements", "symbols": [], "postprocess":
          () => []
      },
      {
        "name": "statements", "symbols": ["statement"], "postprocess":
          (data) => [data[0]]
      },
      {
        "name": "statements", "symbols": ["statement", (myLexer.has("nl") ? { type: "nl" } : nl), "statements"], "postprocess":
          (data) => [data[0], ...data[2]]
      },
      { "name": "statement", "symbols": ["assignment"], "postprocess": id },
      { "name": "statement", "symbols": ["function_call"], "postprocess": id },
      {
        "name": "assignment", "symbols": [(myLexer.has("identifier") ? { type: "identifier" } : identifier), "_", (myLexer.has("assignmentOp") ? { type: "assignmentOp" } : assignmentOp), "_", "literal"], "postprocess":
          (data) => {
            return {
              type: "assignment",
              var_name: data[0],
              value: data[4]
            }
          }
      },
      {
        "name": "function_call", "symbols": [(myLexer.has("identifier") ? { type: "identifier" } : identifier), "_", (myLexer.has("lparen") ? { type: "lparen" } : lparen), "_", "parameter_list", "_", (myLexer.has("rparen") ? { type: "rparen" } : rparen)], "postprocess":
          (data) => {
            return {
              type: "function_call",
              fun_name: data[0],
              paramters: data[4],

            }
          }
      },
      {
        "name": "parameter_list", "symbols": [], "postprocess":
          () => []
      },
      {
        "name": "parameter_list", "symbols": ["expression"], "postprocess":
          (data) => {
            return [data[0]];
          }
      },
      {
        "name": "parameter_list", "symbols": ["expression", "__", "parameter_list"], "postprocess":
          (data) => {
            return [data[0], ...data[2]];
          }
      },
      { "name": "expression", "symbols": [(myLexer.has("identifier") ? { type: "identifier" } : identifier)], "postprocess": id },
      { "name": "expression", "symbols": ["literal"], "postprocess": id },
      { "name": "literal", "symbols": [(myLexer.has("number") ? { type: "number" } : number)], "postprocess": id },
      { "name": "literal", "symbols": [(myLexer.has("string") ? { type: "string" } : string)], "postprocess": id },
      { "name": "_", "symbols": [] },
      { "name": "_", "symbols": ["__"] },
      { "name": "__", "symbols": [(myLexer.has("ws") ? { type: "ws" } : ws)] }
    ]
    , ParserStart: "statements"
  }
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = grammar;
  } else {
    window.grammar = grammar;
  }
})();
