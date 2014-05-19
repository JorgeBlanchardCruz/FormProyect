$(document).ready(function() {
  
  $('#parse').click(function() {
      var myCodeMirror = $(".CodeMirror")[0].CodeMirror;
      var source = myCodeMirror.getValue();

      out.className = "unhidden";

    try {
      var result = ast.parse(source);
      $('#output').html(JSON.stringify(result,undefined,2));
    } catch (e) {
      $('#output').html('<div class="error"><pre>\n' + String(e) + '\n</pre></div>');
    }

    try {
      var result2 = form.parse(source);
      $('#output2').html(JSON.stringify(result2.FORM,undefined,2));
      $('#output3').html(JSON.stringify(result2.HTML,undefined,2));
    } catch (e) {
      $('#output2').html('<div class="error"><pre>\n' + String(e) + '\n</pre></div>');
      $('#output3').html('<div class="error"><pre>\n' + String(e) + '\n</pre></div>');
    }
    
  });

  $("#examples").change(function(ev) {
    var f = ev.target.files[0]; 
    var r = new FileReader();
    r.onload = function(e) { 
      var contents = e.target.result;
      
      var myCodeMirror = $('.CodeMirror')[0].CodeMirror;
      myCodeMirror.setValue(contents);
    }
    r.readAsText(f);
  });
  
});

function save(a, filename) {
  var myCodeMirror = $(".CodeMirror")[0].CodeMirror;
  var source = myCodeMirror.getValue();
  var result2 = form.parse(source);
  var content = result2.FORM;

  var pr = "<!DOCTYPE HTML>"; 
  pr += "<html lang='en'>"
  pr += '<head><meta charset="utf-8">';
  pr += '<title>Form Proyect</title>';
  pr += '<link rel="stylesheet" href="form.css" type="text/css" media="screen" charset="utf-8" />';
  pr += '</head><body>'

  content = pr + content + '</body></html>';

  contentType =  'data:application/octet-stream,';
  uriContent = contentType + encodeURIComponent(content);
  a.setAttribute('href', uriContent);
  a.setAttribute('download', filename);
}

