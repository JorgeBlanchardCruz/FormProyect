{
  var tree = function(f, r) {
    if (r.length > 0) {
      var last = r.pop();
      var result = {
        type:  last[0],
        left: tree(f, r),
        right: last[1]
      };
    }
    else {
      var result = f;
    }
    return result;
  }
}


start
  = BEGIN (initialize)? (options)? form END DOT

initialize
  = HEAD ID

options
  = OPTIONS (logo)? (width)? (height)?

logo 
  = LOGO ASSIGN PATH

width
  = WIDTH ASSIGN NUMBER

height
  = HEIGHT ASSIGN NUMBER

form
  = FORM ((textbox)* (checkbox)*)*

textbox
  = TXT ID ASSIGN VALUE

checkbox
  = CHX ID ASSIGN VALUE 

_ = $[ \t\n\r]*
ASSIGN      = _ '=' _          
ADDMINUS    = _ [+-] _         
MULDIV      = _ [*/] _         
LPAREN      = _ "("_
RPAREN      = _ ")"_
DOT         = _ "." _
COMMA       = _ "," _
SEMICOLON   = _ ";" _
COMPARISON  = _ ([<>=!][=]/[<>]) _ 
ID          = _ ([a-zA-Z_][a-zA-Z_0-9]*) _
NUMBER      = _ [0-9]+ _ 
PATH        = _ (["][\/]?[a-zA-Z0-9\/]*["]) _
VALUE       = _ (["][a-zA-Z]*["]) _ 

BEGIN       = _ ("begin"/"BEGIN") _
END         = _ ("end"/"END") _
HEAD        = _ ("head"/"HEAD") _
OPTIONS     = _ ("options"/"OPTIONS") _ 
LOGO        = _ ("logo"/"LOGO") _ 
WIDTH       = _ ("width"/"WIDTH") _
HEIGHT      = _ ("height"/"HEIGHT") _
FORM        = _ ("form"/"FORM") _
TXT         = _ ("txt"/"TXT") _
CHX         = _ ("chx"/"CHX") _



