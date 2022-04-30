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
    |   statement
        {%
            (data) => [data[0]]
        %}
    |   statement %nl statements
        {%
            (data) => [data[0], ...data[2]]
        %}

statement
    ->  assignment  {% id %}
    |   function_call   {% id %}

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

function_call
    ->  %identifier _ %lparen _ parameter_list _ %rparen
    {%
        (data) => {
            return {
                type: "function_call",
                fun_name: data[0],
                parameters:data[4],

            }
        }
    %}


parameter_list
    -> 
        null
        {%
            () => []
        %}
    |  expression
        {%
            (data) => {
                return [data[0]];
            }
        %}
    |   expression __ parameter_list
        {%
            (data) => {
                return [data[0], ...data[2]];
            }
        %}

expression
    ->  %identifier         {% id %}
    |   literal             {% id %}
    |   function_call       {% id %}

literal
    ->  %number     {% id %}
    |   %string     {% id %}


# Optional WhiteSpace
_ 
    ->  null
    |   __

# Mandatory WhiteSpace
__ -> %ws 