$(document).ready(function(){
	
	$('#Submit').click(function(e){
 
     var myCodeMirror = $(".CodeMirror")[0].CodeMirror;
     var source = myCodeMirror.getValue();
     var result2 = form.parse(source);
     
		$.generateFile({
			filename	: 'export.txt',
			content		: $('#output3').html(JSON.stringify(result2.HTML,undefined,2)),
			script		: 'lib/download.php'
		});
		
		e.preventDefault();
	});
	
/*
	$('#downloadPage').click(function(e){

		$.generateFile({
			filename	: 'page.html',
			content		: $('html').html(),
			script		: 'download.php'
		});
		
		e.preventDefault();
	});
*/	

});