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
start         = BEGIN i:(initialize)? o:(options)? f:(form)* END DOT
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
logo          = LOGO p:PATH                     { return {type: 'LOGO', value: p}; }

// ***** WIDTH : Ancho del formulario
width         = WIDTH n:NUMBER                  { return {type: 'WIDTH', value: n}; }

// ***** HEIGHT : Altura del formulario
height        = HEIGHT n:NUMBER                 { return {type: 'HEIGHT', value: n}; }

// ***** FORM : Informa del inicio de la parte del contenido
form          = FORM t:(textbox)* c:(checkbox)*
                                                {
                                                  var form_ = [];
                                                  form_ = form_.concat(t);
                                                  form_ = form_.concat(c);
                                                  return form_;
                                                }

// ***** TEXTBOX : 
textbox       = TXT i:ID ASSIGN v:VALUE         { return {type: 'TXT', value: v}; }

// ***** CHECKBOX :
checkbox      = CHX i:ID ASSIGN v:VALUE         { return {type: 'CHX', value: v}; }

// ***** CONST : Símbolos terminales
_ = $[ \t\n\r]*
ASSIGN      = _ '=' _          
DOT         = _ "." _
SEMICOLON   = _ ";" _ 
ID          = _ id:$([a-zA-Z_][a-zA-Z_0-9]*) _  { return id; }
NUMBER      = _ digits:$[0-9]+ _                { return parseInt(digits, 10); } 
PATH        = _ path:$(["][\/]?[a-zA-Z0-9\/]*.[a-zA-Z_0-9]*["]) _ 
                                                { return path; }
VALUE       = _ val:$(["][a-zA-Z0-9\-_ ]*["]) _  
                                                { return val; }

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



