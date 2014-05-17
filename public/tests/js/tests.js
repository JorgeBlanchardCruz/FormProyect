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
/*
   test('Linea', function() {
      var esperado = '';
      var source = 'begin form LINE ; end.';
      var result = ast.parse(source);
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
*/
   test('Textbox', function() {
      var esperado = '[\n  {\n    "type": "FORM",\n    "value": [\n      {\n        "type": "TXT",\n        "label": "etiqueta",\n        "value": "valor por defecto"\n      },\n      {\n        "type": "WHITELINE"\n      }\n    ]\n  }\n]';
      var source = 'begin form txt "etiqueta" ident = "valor por defecto"; end.';
      var result = ast.parse(source);
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
/*
   test('E-mail', function() {
      var esperado = '';
      var source = 'begin form email "gonzalo" correo = "user@gmail.com"; end.';
      var result = ast.parse(source);
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
*/
   test('Telefono', function() {
      var esperado = '[\n  {\n    "type": "FORM",\n    "value": [\n      {\n        "type": "TEL",\n        "label": "Telefono",\n        "value": "123456789 "\n      }\n    ]\n  }\n]';
      var source = 'begin form TEL "Telefono" telefono = 123456789 end.';
      var result = ast.parse(source);
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
/*
   test('Fecha', function() {
      var esperado = '';
      var source = '';
      var result = ast.parse(source);
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
*/
   test('Rango', function() {
      var esperado = '[\n  {\n    "type": "FORM",\n    "value": [\n      {\n        "type": "RAG",\n        "label": null,\n        "value": "100"\n      }\n    ]\n  }\n]';
      var source = 'begin form RAG rango = "100" end.';
      var result = ast.parse(source);
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Contraseña', function() {
      var esperado = '[\n  {\n    "type": "FORM",\n    "value": [\n      {\n        "type": "PWD",\n        "label": null,\n        "value": "gonzalo"\n      }\n    ]\n  }\n]';
      var source = 'begin form PWD password = "gonzalo" end.';
      var result = ast.parse(source);
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Checkbox', function() {
      var esperado = '[\n  {\n    "type": "FORM",\n    "value": [\n      {\n        "type": "CHX",\n        "label": "coche",\n        "value": "coche"\n      },\n      {\n        "type": "CHX",\n        "label": "Bicicleta",\n        "value": "Bicicleta"\n      }\n    ]\n  }\n]';
      var source = 'begin form CHX "coche"  vehiculo = "coche" CHX "Bicicleta"  vehiculo = "Bicicleta" end.';
      var result = ast.parse(source);
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Radiobutton', function() {
      var esperado = '[\n  {\n    "type": "FORM",\n    "value": [\n      {\n        "type": "RBT",\n        "label": "masculino",\n        "value": ""\n      },\n      {\n        "type": "RBT",\n        "label": "femenino",\n        "value": ""\n      }\n    ]\n  }\n]';
      var source = 'begin form RBT "masculino" sexo = "" RBT "femenino" sexo = "" end.';
      var result = ast.parse(source);
         
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Etiqueta', function() {
      var esperado = 'SyntaxError: Expected "-", ";", "BTN", "CHX", "DAT", "EMAIL", "END", "FORM", "LBL", "PWD", "RAG", "RBT", "TABLE", "TEL", "TXT", "btn", "chx", "dat", "email", "end", "form", "lbl", "pwd", "rag", "rbt", "table", "tel", "txt" or [ \t\n\r] but "\"" found.';
      var source = 'begin form LBL "Esto es una etiqueta" end.';
      var result = ast.parse(source);
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Boton', function() {
      var esperado = '[\n  {\n    "type": "FORM",\n    "value": [\n      {\n        "type": "BTN",\n        "label": "Submit",\n        "id": "submit"\n      }\n    ]\n  }\n]';
      var source = 'begin form BTN "Submit" submit end.';
      var result = ast.parse(source);
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Lista Desplegable (Combobox)', function() {
      var esperado = 'SyntaxError: Expected "-", ";", "BTN", "CHX", "DAT", "EMAIL", "END", "FORM", "LBL", "PWD", "RAG", "RBT", "TABLE", "TEL", "TXT", "btn", "chx", "dat", "email", "end", "form", "lbl", "pwd", "rag", "rbt", "table", "tel", "txt" or [ \t\n\r] but "c" found.';
      var source = 'begin form cbx pais = "Spain" ,"Germany" ,"Poland" ,"UK"; end.';
      var result = ast.parse(source);
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
});

suite('HTML', function() {
   test('Cabecero AST', function() {
   });
});