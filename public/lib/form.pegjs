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
start
  = BEGIN (initialize)? (options)? (form)* END DOT

// ***** INITIZLIZE : En principio el encabezado del formulario 
initialize
  = HEAD ID

// ***** OPTIONS : Opciones del estilo del formulario
options
  = OPTIONS (logo)? (width)? (height)?

// ***** LOGO : Se añade la ruta donde se encuentra el logo
logo 
  = LOGO ASSIGN PATH

// ***** WIDTH : Ancho del formulario
width
  = WIDTH ASSIGN NUMBER

// ***** HEIGHT : Altura del formulario
height
  = HEIGHT ASSIGN NUMBER

// ***** FORM : Informa del inicio de la parte del contenido
form
  = FORM (textbox)* (checkbox)*

// ***** TEXTBOX : 
textbox
  = TXT ID ASSIGN VALUE

// ***** CHECKBOX :
checkbox
  = CHX ID ASSIGN VALUE 

// ***** CONST : Símbolos terminales
_ = $[ \t\n\r]*
ASSIGN      = _ '=' _          
DOT         = _ "." _
SEMICOLON   = _ ";" _ 
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



