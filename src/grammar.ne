@{%
    const myLexer = require("./lexer");
%}

@lexer myLexer

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
    -> %identifier _  %assignmentOp _ literal
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
                paramters:data[4],

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

literal
    ->  %number     {% id %}
    |   %string     {% id %}


# Optional WhiteSpace
_ 
    ->  null
    |   __

# Mandatory WhiteSpace
__ -> %ws 