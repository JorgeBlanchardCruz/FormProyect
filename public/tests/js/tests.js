var assert = chai.assert;

suite('AST', function() {
	test('Cabecero AST', function() {
		var esperado = '[\n  {\n    "type": "HEAD",\n    "value": "Formulario"\n  },\n  {\n    "type": "FORM",\n    "value": []\n  }\n]';
      var source = 'begin head Formulario form end.';
      var result = ast.parse(source);
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
	});
   test('Cabecero con opciones AST', function() {
      var esperado = '[\n  {\n    "type": "HEAD",\n    "value": "Formulario"\n  },\n  {\n    "type": "LOGO",\n    "value": "img/github.png"\n  },\n  {\n    "type": "WIDTH",\n    "value": 25\n  },\n  {\n    "type": "HEIGHT",\n    "value": 25\n  },\n  {\n    "type": "FORM",\n    "value": []\n  }\n]';
      var source = 'begin head Formulario options logo "img/github.png" width 25 height 25 form end.';
      var result = ast.parse(source);
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Linea en Blanco', function() {
      var esperado = '[\n  {\n    "type": "FORM",\n    "value": [\n      {\n        "type": "WHITELINE"\n      },\n      {\n        "type": "WHITELINE"\n      }\n    ]\n  }\n]';
      var source = 'begin form ;; end.';
      var result = ast.parse(source);
         
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Linea', function() {
      var esperado = '';
      var source = 'begin form LINE ; end.';
      var result = ast.parse(source);
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Textbox', function() {
      var esperado = '[\n  {\n    "type": "FORM",\n    "value": [\n      {\n        "type": "TXT",\n        "label": "etiqueta",\n        "value": "valor por defecto"\n      },\n      {\n        "type": "WHITELINE"\n      }\n    ]\n  }\n]';
      var source = 'begin form txt "etiqueta" ident = "valor por defecto"; end.';
      var result = ast.parse(source);
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('E-mail', function() {
      var esperado = '';
      var source = 'begin form email "gonzalo" correo = "user@gmail.com"; end.';
      var result = ast.parse(source);
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Telefono', function() {
      var esperado = '[\n  {\n    "type": "FORM",\n    "value": [\n      {\n        "type": "TEL",\n        "label": "Telefono",\n        "value": "123456789"\n      }\n    ]\n  }\n]';
      var source = 'begin form TEL "Telefono" telefono = 123456789 end.';
      var result = ast.parse(source);
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Fecha', function() {
      var esperado = '';
      var source = '';
      var result = ast.parse(source);
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Rango', function() {
      var esperado = '';
      var source = '';
      var result = ast.parse(source);
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Contraseña', function() {
      var esperado = '';
      var source = '';
      var result = ast.parse(source);
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Checkbox', function() {
      var esperado = '';
      var source = '';
      var result = ast.parse(source);
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Radiobutton', function() {
      var esperado = '';
      var source = '';
      var result = ast.parse(source);
         
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Etiqueta', function() {
      var esperado = '';
      var source = '';
      var result = ast.parse(source);
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Boton', function() {
      var esperado = '';
      var source = '';
      var result = ast.parse(source);
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Lista Desplegable (Combobox)', function() {
      var esperado = '';
      var source = '';
      var result = ast.parse(source);
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
});