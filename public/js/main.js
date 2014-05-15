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

  $("#Submit").click(function(e) {

     var myCodeMirror = $(".CodeMirror")[0].CodeMirror;
     var source = myCodeMirror.getValue();
     var result2 = form.parse(source);
     
     $.generateFile({
         filename    : 'formulario.html', //export.txt
         //content     : $('#output3'),
         content     : $('#output3').html(JSON.stringify(result2.HTML,undefined,2)),
         script      : 'lib/download.php'
     });

     e.preventDefault();
  });

  $("#Submit2").click(function(e) {
     //alert("Descargando formulario en HTML");
     //alert("Output 3: " + $('#output3'));

     var myCodeMirror = $(".CodeMirror")[0].CodeMirror;
     var source = myCodeMirror.getValue();
     var result2 = form.parse(source);
     
     $.generateFile({
         filename    : 'formulario.pdf', //export.txt
         //content     : $('#output3'),
         content     : $('#output3').html(JSON.stringify(result2.HTML,undefined,2)),
         script      : 'lib/pdf.php'
     });

     e.preventDefault();
  });
  
});

  

