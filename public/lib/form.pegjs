/*
 * Gramática definida para reconocer el estilo y componentes de un formulario.
 * Este parse genera el AST.
 */

// ***** Definición de funciones 
{
  // ***** Funciones que nos sirve para la salida
  var tag = function(tg, ct, cl) {
    var pr = ''; 
    var po = "</" + tg + ">";
    ct = ct.replace(/\n+$/,'');
    if (cl) {
      pr = "<" + tg +" class='"+cl+"'>";
    } else {
      pr = "<" + tg +">";
    }
    return "\t"+pr+ct+po+"\n";
  }
  var form_ = function (typ, nam, val) {
    var pr = "<input type='"+typ+"' name='"+nam+"'>";
    var po = "</br>";
    val = val.replace(/\n+$/,'');
    return "\t"+pr+val+po+"\n";
  }
  var img = function (logo, h, w, alt) {
    var pr = ''; 
    var po = '';
    logo = logo.replace(/\n+$/,'');
    if (alt) {
        pr = "<img scr='"+logo+"' alt='"+alt+"' height='"+h+"' width='"+w+"'>";
    } else {
      pr = "<img scr='"+logo+"' height='"+h+"' width='"+w+"'>";
    }
    return "\t"+pr+logo+po+"\n";
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
initialize    = HEAD i:ID                       { return tag("h1", i); }

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
logo          = LOGO p:PATH                     { return img(p, 30, 30); }

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
textbox       = TXT i:ID ASSIGN v:VALUE         { return form_("text", i, v); }

// ***** CHECKBOX :
checkbox      = CHX i:ID ASSIGN v:VALUE         { return form_("checkbox", i, v); }

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



