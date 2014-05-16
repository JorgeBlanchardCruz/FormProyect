/*
 * Gramática definida para reconocer el estilo y componentes de un formulario.
 * Este parse genera el AST.
 */

// ***** Definición de funciones 
{

  const COLPXDEF = 200, NCOLDEF = 1;
  var icol = 0, Ncol = NCOLDEF, CreatingTable = false;

  var css = function(w, h) {
    /*var pr = '<style type="text/css">'; 
    var po = '</style>';
    w = w.replace(/\n+$/,'');
    h = h.replace(/\n+$/,'');
    if (!w) w = "auto"
    if (!h) h = "auto"
    pr = pr + 'body { width: ' + w + 'px; height: ' + h + 'px; }';
    return pr+po;*/

    return ' ';
  }

  // ***** Escape del HTML
  var entityMap = {
    "&": "&amp;",   
    "<": "&lt;",    
    ">": "&gt;",    
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) { return entityMap[s]; });
  };

  // ***** Funciones que nos sirve para la salida
  var tag = function(tg, ct, op, cl) {
    var pr = ''; 

    var po = "</" + tg + ">";

    ct = ct.replace(/\n+$/,'');
    if (cl) {
      pr = "<" + tg + " " + op + " class='"+cl+"'>";
    } 
    else {
      pr = "<" + tg + " " + op + ">";
    }

    return pr+ct+po;
  }

  var form_ = function (typ, lab, nam, val) {
    var pi = "", pr, po = "";

    if(Ncol > 1){
      pi += (icol == 0 ? "<tr>" : ""); icol++;
      pi += "<td>";

      po += "</td>";
      if (icol == Ncol){ po += "</tr>"; icol = 0; }
    }
    else
      po = '</br>';

  	if(typ != "combobox")
    	val = val.replace(/\"/g,'');

    lab = (lab ? lab : "");

	  switch(typ){
	    case "whiteline":
	      pr = '</br>'; 
	      break;

	    case "line":
	      pr = '<hr>';
	      break;      

	    case "radio":
	    case "checkbox":
	      lab = " " + lab;
	      pr = "<input type="+typ+" name="+nam+" value='"+val+"'>"+lab;
	        break;

	    case "label":
	      pr = "<pre>" + val + "</pre>";
	      break;

	    case "button":
	      pr = "<button type='"+typ+" id='"+nam+"' '>"+lab+"</button>";
	      break;

	    case "combobox":
	      pr = '<select id ='+nam+'> '+val+'</select>'
	      break

	    default:
	      pr = lab+" <input type='"+typ+"' name='"+nam+"' placeholder='"+val+"'>";
	  }

    return pi+pr+po;
  }

  var img = function (logo, h, w, alt) {
    var pr = "<div align='center'>"; 
    var po = '</div>';
    logo = logo.replace(/"\n+$"/,'');
    if (alt) {
      pr += "<img src='"+logo+"' alt='"+alt+"' height='"+h+"' width='"+w+"'>";
    } else {
        pr += "<img src='"+logo+"' height='"+h+"' width='"+w+"'>";
    }

    return pr+po+'<br><br>';
  }
}

// ***** START : expresión de arranque
start         = BEGIN i:(initialize)? o:(options)? f:(form)+ END DOT
                                                {
                                                  var start_ = [];
                                                  if(i) start_ = start_.concat(i);
                                                  if(o) start_ = start_.concat(o);
                                                  if(f) start_ = start_.concat(f);
                                                  return {HTML: escapeHtml(start_.join('')), 
                                                          FORM: start_.join('')}; 
                                                }

// ***** INITIALIZE : En principio el encabezado del formulario 
initialize    = HEAD i:ID                       { return tag("h1", i, "align='center'"); }

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
logo          = LOGO p:PATH v:(VALUE)?          { return img(p, 30, 30, v); }

// ***** WIDTH : Ancho del formulario
width         = WIDTH n:NUMBER                  { return n; }

// ***** HEIGHT : Altura del formulario
height        = HEIGHT n:NUMBER                 { return n; }

// ***** FORM : Informa del inicio de la parte del contenido
form          = FORM f:(
								    w:whiteline    		{ return w; }
								  / t:table 			{ return t; }
								  / e:endtable 			{ return e; }
								  / l:line    		    { return l; }
		                          / t:textbox           { return t; }
		                          / e:email             { return e; }
		                          / t:tel               { return t; }
		                          / d:date              { return d; }
		                          / r:range             { return r; }
		                          / p:password          { return p; }
		                          / c:checkbox          { return c; }
		                          / r:radiobutton       { return r; }
		                          / l:label         	{ return l; }
		                          / b:button 			{ return b; }
		                          / c:combobox          { return c; }
		                        )*
                        { 	
							var endtable = (CreatingTable ? ' </table>' : '');
							return '<form> '+f.join('')+endtable+' </form>'; 
						}


table = TABLE c:(NUMBER)? w:(NUMBER)? 					{
															c = ( c ? c : NCOLDEF);
								                        	w = ( w ? w : COLPXDEF);

															Ncol = c;
								                        	icol = 0;  
								                        	CreatingTable = true;           	

								                        	return '<table style="width:'+w+'px">';
														}

endtable 		= ENDTABLE 								{ 	
															var out = (CreatingTable ? '</table>' : '');
															CreatingTable = false;

															return out; 
														}

// ***** Linea en blanco : 
whiteline     = WHITELINE               { return form_("whiteline", "", "", ""); }

// ***** Línea horizontal
line      = LINE                  { return form_("line", "", "", ""); }

// ***** TEXTBOX : 
textbox       = TXT l:(VALUE)? i:ID ASSIGN v:VALUE    { return form_("text", l, i, v); }

// ***** CHECKBOX :
checkbox        = CHX l:(VALUE)? i:ID ASSIGN v:VALUE    { return form_("checkbox", l, i, v); }

// ***** RADIO BUTTONS :
radiobutton     = RBT l:(VALUE)? i:ID ASSIGN v:VALUE    { return form_("radio", l, i, v); }

// ***** PASSWORD :
password        = PWD l:(VALUE)? i:ID ASSIGN v:VALUE    { return form_("password", l, i, v); }

// ***** EMAIL :
email           = EMAIL l:(VALUE)? i:ID ASSIGN v:MAIL   { return form_("email", l, i, v); }

// ***** TEL :
tel             = TEL l:(VALUE)? i:ID ASSIGN v:TLF    { return form_("tel", l, i, v); }

// ***** DATE :
date            = DAT l:(VALUE)? i:ID ASSIGN v:VALUE    { return form_("date", l, i, v); }

// ***** RANGE :
range           = RAG l:(VALUE)? i:ID ASSIGN v:VALUE    { return form_("range", l, i, v); }

// ***** LABEL :
label           = v:VALUE            { return form_("label", "","",v); }

// ***** BUTTON
button          = BTN l:(VALUE)? i:ID           { return form_("button", l, i, ""); }

// ***** COMBOBOX
combobox        = CBX i:ID ASSIGN ci:(combobox_item)+       { return form_("combobox", "", i, ci);}
combobox_item   = v:VALUE                                   { return '<option value="'+v+'">'+v+'</option> \n'; }


// ***** CONST : Símbolos terminales
_           = $[ \t\n\r]*
ASSIGN      = _ '=' _          
DOT         = _ "." _
COMMA       = _ "," _
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
CBX         = _ ("cbx"/"CBX") _