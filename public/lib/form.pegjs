/*
 * Gramática definida para reconocer el estilo y componentes de un formulario.
 * Este parse genera el AST.
 */

// ***** Definición de funciones 
{
  var css = function(w, h) {
    /*var pr = '<style type="text/css">'; 
    var po = '</style>';
    w = w.replace(/\n+$/,'');
    h = h.replace(/\n+$/,'');
    if (!w) w = "auto"
    if (!h) h = "auto"
    pr = pr + 'body { width: ' + w + 'px; height: ' + h + 'px; }';
    return pr+po;*/
    return w + ' ' + h;
  }

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
    return '\t'+pr+ct+po+'\n';
  }

  var form_ = function (typ, lab, nam, val) {
  	var attrid;
  	if(typ == "radio")
  		attrid = "name"
  	else
  		attrid = "id"	

  	val = val.replace(/\"/g,'');
  	var pr = "<p>"+lab+"</p>";
    pr += "<input type='"+typ+"' "+attrid+"='"+nam+"' placeholder='"+val+"'>";
    var po = "</br>"; 
    return pr+po;
  }

  var img = function (logo, h, w, alt) {
    var pr = ''; 
    var po = '';
    logo = logo.replace(/"\n+$"/,'');
    if (alt) {
        pr = "<img scr='"+logo+"' alt='"+alt+"' height='"+h+"' width='"+w+"'>";
    } else {
      pr = "<img scr='"+logo+"' height='"+h+"' width='"+w+"'>";
    }
    return '\t'+pr+logo+po+'\n';
  }
}

// ***** START : expresión de arranque
start         = BEGIN i:(initialize)? o:(options)? f:(form)+ END DOT
                                                {
                                                  var start_ = [];
                                                  if(i) start_ = start_.concat(i);
                                                  if(o) start_ = start_.concat(o);
                                                  if(f) start_ = start_.concat(f);
                                                  return start_.join('');
                                                }

// ***** INITIALIZE : En principio el encabezado del formulario 
initialize    = HEAD i:ID                       { return tag("h1", i); }

// ***** OPTIONS : Opciones del estilo del formulario
options       = OPTIONS l:(logo)? w:(width)? h:(height)?
                                                {
                                                  var options_ = [];
                                                  if(l) options_ = options_.concat(l);
                                                  size = css(w, h);
                                                  options_ = options_.concat(size);
                                                  return options_.join('');
                                                }

// ***** LOGO : Se añade la ruta donde se encuentra el logo
logo          = LOGO p:PATH                     { return img(p, 30, 30); }

// ***** WIDTH : Ancho del formulario
width         = WIDTH n:NUMBER                  { return n; }

// ***** HEIGHT : Altura del formulario
height        = HEIGHT n:NUMBER                 { return n; }

// ***** FORM : Informa del inicio de la parte del contenido
form          = FORM f:(
                          t:textbox             { return t; }
                          / p:password          { return p; }
                          / c:checkbox          { return c; }
                          / r:radiobutton       { return r; }
                        )*
                                                { return "<form>" + f.join('') + "</form>"; }

// ***** TEXTBOX : 
textbox       = TXT l:ID i:ID ASSIGN v:VALUE     { return form_("text", l, i, v); }

// ***** CHECKBOX :
checkbox      = CHX l:ID i:ID ASSIGN v:VALUE     { return form_("checkbox", l, i, v); }

// ***** RADIO BUTTONS :
radiobutton   = RBT l:ID i:ID ASSIGN v:VALUE     { return form_("radio", l, i, v); }

// ***** PASSWORD :
password      = PWD l:ID i:ID ASSIGN v:VALUE     { return form_("password", l, i, v); }

// ***** CONST : Símbolos terminales
_ = $[ \t\n\r]*
ASSIGN      = _ '=' _          
DOT         = _ "." _
SEMICOLON   = _ ";" _ 
ID          = _ id:$([a-zA-Z_][a-zA-Z_0-9]*) _                    { return id; }
NUMBER      = _ digits:$[0-9]+ _                                  { return parseInt(digits, 10); } 
PATH        = _ path:$(["][\/]?[a-zA-Z0-9\/]*.[a-zA-Z_0-9]*["]) _ { return path; }
VALUE       = _ val:$(["][a-zA-Z0-9\-_ ]*["]) _                   { return val; }

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
RBT         = _ ("rbt"/"RBT") _
PWD         = _ ("pwd"/"PWD") _



