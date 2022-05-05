@{%
    const myLexer = require("./lexer");
%}

@lexer myLexer

program
    ->  statements
        {%  
            (data) => {
                return {
                    type: "program",
                    body: data[0]
                }
            }
        %}

statements
    ->  null
        {%
            () => []
        %}
    |   _ statement _
        {%
            (data) => [data[1]]
        %}
    |   _ statement _ %nl statements
        {%
            (data) => [data[1], ...data[4]]
        %}

statement
    ->  assignment          {% id %}
    |   function_call       {% id %}
    |   function_definition {% id %}

assignment
    -> %identifier _  %assignmentOp _ expression
    {%
        (data) => {
            return {
                type: "assignment",
                var_name: data[0],
                value: data[4]
            }
        }
    %}

# doIt(a b c)
function_call
    ->  %identifier _ %lparen _ expression_list _ %rparen
    {%
        (data) => {
            return {
                type: "function_call",
                fun_name: data[0],
                parameters:data[4],

            }
        }
    %}
    # |   %identifier _ %lparen _ %rparen
    # {%
    #     (data) => {
    #        return {
    #             type: "function_call",
    #             fun_name: data[0],
    #             parameters: [],
    #        }
    #     }
    # %}

# doIt(a b c) [
#    ...
# ]
function_definition
    ->  %identifier _ %lparen _ expression_list _ %rparen _ code_block
    {%
        (data) => {
            return {
                type: "function_definition",
                fun_name: data[0],
                parameters:data[4],
                body: data[8]
            }
        }
    %}

code_block
    ->  %lbracket _ %nl statements %nl _ %rbracket
        {%
            (data) => {
                return {
                    type: "code_block",
                    statements: data[3],
                }
            }
        %}

expression_list
    -> 
        # null
        # {%
        #     () => []
        # %}
    # |  
    expression
        {%
            (data) => {
                return [data[0]];
            }
        %}
    |   expression __ expression_list
        {%
            (data) => {
                return [data[0], ...data[2]];
            }
        %}

expression
    ->  %identifier         {% id %}
    |   literal             {% id %}
    |   function_call       {% id %}
    |   code_block          {% id %}
    |   array_literal       {% id %}

literal
    ->  %number     {% id %}
    |   %string     {% id %}


# Array Literal
# Ex : arr = {1 2 3}
array_literal
    -> %lbrace _ expression_list _ %rbrace
        {%
            (data) => {
                return {
                    type: "array_literal",
                    items: data[2]
                }
            }
        %}
    |   %lbrace _ %rbrace
        {%
            () => {
                return {
                    type: "array_literal",
                    items: []
                }
            }
        %}

# Optional WhiteSpace
_ 
    ->  null
    |   __

# Mandatory WhiteSpace
__ -> %ws 