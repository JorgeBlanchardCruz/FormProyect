/*
 * Gramática definida para reconocer el estilo y componentes de un formulario.
 * Este parse genera el AST.
 */

// ***** Definición de funciones 
{
  // ***** Función que nos sirve para la salida
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

// ***** START : expresión de arranque
start         = BEGIN i:(initialize)? o:(options)? f:(form)+ END DOT
                                                {
                                                  var start_ = [];
                                                  if(i) start_ = start_.concat(i);
                                                  if(o) start_ = start_.concat(o);
                                                  if(f) start_ = start_.concat(f);
                                                  return start_;
                                                }

// ***** INITIZLIZE : En principio el encabezado del formulario 
initialize    = HEAD i:ID                       { return {type: 'HEAD', value: i}; }

// ***** OPTIONS : Opciones del estilo del formulario
options       = OPTIONS l:(logo)? w:(width)? h:(height)?
                                                {
                                                  var options_ = [];
                                                  if(l) options_ = options_.concat(l);
                                                  if(w) options_ = options_.concat(w);
                                                  if(h) options_ = options_.concat(h);
                                                  return options_;
                                                }

// ***** LOGO : Se añade la ruta donde se encuentra el logo
logo          = LOGO p:PATH v:(VALUE)?          { return {type: 'LOGO', value: p}; }

// ***** WIDTH : Ancho del formulario
width         = WIDTH n:NUMBER                  { return {type: 'WIDTH', value: n}; }

// ***** HEIGHT : Altura del formulario
height        = HEIGHT n:NUMBER                 { return {type: 'HEIGHT', value: n}; }

// ***** FORM : Informa del inicio de la parte del contenido
form          = FORM f:(
                          w:whiteline           { return w; }
                          / l:line              { return l; }
                          / t:textbox           { return t; }
                          / e:email             { return e; }
                          / t:tel               { return t; }
                          / d:date              { return d; }
                          / r:range             { return r; }
                          / p:password          { return p; }
                          / c:checkbox          { return c; }
                          / r:radiobutton       { return r; }
                          / l:label             { return l; }
                          / b:button            { return b; }
                        )*
                                                { return {type: 'FORM', value: f}; }

// ***** Linea en blanco : 
whiteline     = WHITELINE                           { return {type: 'WHITELINE'}; }

// ***** LINE
line          = LINE                                { return {type: 'LINE'}; }

// ***** TEXTBOX : 
textbox       = TXT l:(VALUE)? i:ID ASSIGN v:VALUE  { return {type: 'TXT', label: l, value: v}; }

// ***** CHECKBOX :
checkbox      = CHX l:(VALUE)? i:ID ASSIGN v:VALUE  { return {type: 'CHX', label: l, value: v}; }

// ***** RADIO BUTTONS :
radiobutton   = RBT l:(VALUE)? i:ID ASSIGN v:VALUE  { return {type: 'RBT', label: l, value: v}; }

// ***** PASSWORD :
password      = PWD l:(VALUE)? i:ID ASSIGN v:VALUE  { return {type: 'PWD', label: l, value: v}; }

// ***** EMAIL :
email         = EMAIL l:(VALUE)? i:ID ASSIGN v:MAIL { return {type: 'EMAIL', label: l, value: v}; }

// ***** TEL :
tel           = TEL l:(VALUE)? i:ID ASSIGN v:TLF    { return {type: 'TEL', label: l, value: v}; }

// ***** DATE :
date          = DAT l:(VALUE)? i:ID ASSIGN v:VALUE  { return {type: 'DAT', label: l, value: v}; }

// ***** RANGE :
range         = RAG l:(VALUE)? i:ID ASSIGN v:VALUE  { return {type: 'RAG', label: l, value: v}; }

// ***** LABEL :
label         = LBL v:(VALUE)?                      { return {type: 'LBL', value: v}; }

// ***** BUTTON
button        = BTN l:(VALUE)? i:ID                 { return {type: 'BTN', label: l, id: i}; }    

// ***** CONST : Símbolos terminales
_           = $[ \t\n\r]*
ASSIGN      = _ '=' _          
DOT         = _ "." _
SEMICOLON   = _ ";" _ 
ID          = _ id:$([a-zA-Z_][a-zA-Z_0-9]*) _                    { return id; }
NUMBER      = _ digits:$[0-9]+ _                                  { return parseInt(digits, 10); } 
PATH        = _ (["]) path:$([\/]?[a-zA-Z0-9áéíóú+!\/]*.[a-zA-Z_0-9]*) (["]) _ 
                                                                  { return path; }
VALUE       = _ (["]) val:$([a-zA-Z0-9\-_áéíóú+!. ]*) (["]) _     { return val; }
MAIL        = _ email:$([a-zA-Z_0-9.-áéíóú+!]*[@][a-zA-Z]*.[a-zA-Z]*) _
                                                                  { return email; }
TLF         = _ tlf:$([0-9 ]*) _                                  { return tlf; }

BEGIN       = _ ("begin"/"BEGIN") _
END         = _ ("end"/"END") _
HEAD        = _ ("head"/"HEAD") _
OPTIONS     = _ ("options"/"OPTIONS") _ 
LOGO        = _ ("logo"/"LOGO") _ 
WIDTH       = _ ("width"/"WIDTH") _
HEIGHT      = _ ("height"/"HEIGHT") _
FORM        = _ ("form"/"FORM") _

// ** Objetos del formulario
TABLE       = _ ("table"/"TABLE") _
ENDTABLE    = _ ("endtable"/"ENDTABLE") _
WHITELINE = _ (";") _   //si se pudiera conseguir que los espacios con enter los interpretara como linea en blanco sería genial.
LINE      = _ ("-") _
TXT         = _ ("txt"/"TXT") _
CHX         = _ ("chx"/"CHX") _
RBT         = _ ("rbt"/"RBT") _
PWD         = _ ("pwd"/"PWD") _
EMAIL       = _ ("email"/"EMAIL") _
TEL         = _ ("tel"/"TEL") _
DAT         = _ ("dat"/"DAT") _
RAG         = _ ("rag"/"RAG") _
LBL         = _ ("lbl"/"LBL") _
BTN         = _ ("btn"/"BTN") _


