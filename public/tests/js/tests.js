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
      var esperado = '[\n  {\n    "type": "FORM",\n    "value": [\n      {\n        "type": "LBL",\n        "value": "Esto es una etiqueta"\n      }\n    ]\n  }\n]';
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
   test('Error', function() {
      var source = 'begin end.';
      var result = ast.parse(source);
      
      assert.match (JSON.stringify(result,undefined,2), /SyntaxError/)
   });
});

//******************************************************************************************
suite('HTML', function() {
   test('Cabecero HTML', function() {
      var esperado = '{\n  "HTML": "&lt;h1 align=&#39;center&#39;&gt;Formulario&lt;&#x2F;h1&gt;&lt;form&gt;  &lt;&#x2F;form&gt;",\n  "FORM": "<h1 align=\'center\'>Formulario</h1><form>  </form>"\n}';
      var source = 'begin head Formulario form end.';
      var result = form.parse(source)
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });

   test('Cabecero con opciones HTML', function() {
      var esperado = '{\n  "HTML": "&lt;h1 align=&#39;center&#39;&gt;Formulario&lt;&#x2F;h1&gt;&lt;div align=&#39;center&#39;&gt;&lt;img src=&#39;img&#x2F;github.png&#39; height=&#39;30&#39; width=&#39;30&#39;&gt;&lt;&#x2F;div&gt;&lt;br&gt;&lt;br&gt; &lt;form&gt;  &lt;&#x2F;form&gt;",\n  "FORM": "<h1 align=\'center\'>Formulario</h1><div align=\'center\'><img src=\'img/github.png\' height=\'30\' width=\'30\'></div><br><br> <form>  </form>"\n}';
      var source = 'begin head Formulario options logo "img/github.png" width 25 height 25 form end.';
      var result = form.parse(source)
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Linea en Blanco', function() {
      var esperado = '{\n  "HTML": "&lt;form&gt; &lt;&#x2F;br&gt;&lt;&#x2F;br&gt;&lt;&#x2F;br&gt;&lt;&#x2F;br&gt; &lt;&#x2F;form&gt;",\n  "FORM": "<form> </br></br></br></br> </form>"\n}';
      var source = 'begin form ;; end.';
      var result = form.parse(source)
         
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
/*
   test('Linea', function() {
      var esperado = '';
      var source = 'begin form LINE ; end.';
      var result = form.parse(source)
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
*/

   test('Textbox', function() {
      var esperado = '{\n  "HTML": "&lt;form&gt; etiqueta &lt;input type=&#39;text&#39; name=&#39;ident&#39; placeholder=&#39;valor por defecto&#39;&gt;&lt;&#x2F;br&gt;&lt;&#x2F;br&gt;&lt;&#x2F;br&gt; &lt;&#x2F;form&gt;",\n  "FORM": "<form> etiqueta <input type=\'text\' name=\'ident\' placeholder=\'valor por defecto\'></br></br></br> </form>"\n}';
      var source = 'begin form txt "etiqueta" ident = "valor por defecto"; end.';
      var result = form.parse(source)
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });

/*
   test('E-mail', function() {
      var esperado = '';
      var source = 'begin form email "gonzalo" correo = "user@gmail.com"; end.';
      var result = form.parse(source)
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
*/

   test('Telefono', function() {
      var esperado = '{\n  "HTML": "&lt;form&gt; Telefono &lt;input type=&#39;tel&#39; name=&#39;telefono&#39; placeholder=&#39;123456789 &#39;&gt;&lt;&#x2F;br&gt; &lt;&#x2F;form&gt;",\n  "FORM": "<form> Telefono <input type=\'tel\' name=\'telefono\' placeholder=\'123456789 \'></br> </form>"\n}';
      var source = 'begin form TEL "Telefono" telefono = 123456789 end.';
      var result = form.parse(source)
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
/*
   test('Fecha', function() {
      var esperado = '';
      var source = '';
      var result = form.parse(source)
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
*/
   test('Rango', function() {
      var esperado = '{\n  "HTML": "&lt;form&gt;  &lt;input type=&#39;range&#39; name=&#39;rango&#39; placeholder=&#39;100&#39;&gt;&lt;&#x2F;br&gt; &lt;&#x2F;form&gt;",\n  "FORM": "<form>  <input type=\'range\' name=\'rango\' placeholder=\'100\'></br> </form>"\n}';
      var source = 'begin form RAG rango = "100" end.';
      var result = form.parse(source)
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Contraseña', function() {
      var esperado =  '{\n  "HTML": "&lt;form&gt;  &lt;input type=&#39;password&#39; name=&#39;password&#39; placeholder=&#39;gonzalo&#39;&gt;&lt;&#x2F;br&gt; &lt;&#x2F;form&gt;",\n  "FORM": "<form>  <input type=\'password\' name=\'password\' placeholder=\'gonzalo\'></br> </form>"\n}';
      var source = 'begin form PWD password = "gonzalo" end.';
      var result = form.parse(source)
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Checkbox', function() {
      var esperado = '{\n  "HTML": "&lt;form&gt; &lt;input type=checkbox name=vehiculo value=&#39;coche&#39;&gt; coche&lt;&#x2F;br&gt;&lt;input type=checkbox name=vehiculo value=&#39;Bicicleta&#39;&gt; Bicicleta&lt;&#x2F;br&gt; &lt;&#x2F;form&gt;",\n  "FORM": "<form> <input type=checkbox name=vehiculo value=\'coche\'> coche</br><input type=checkbox name=vehiculo value=\'Bicicleta\'> Bicicleta</br> </form>"\n}';
      var source = 'begin form CHX "coche"  vehiculo = "coche" CHX "Bicicleta"  vehiculo = "Bicicleta" end.';
      var result = form.parse(source)
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Radiobutton', function() {
      var esperado = '{\n  "HTML": "&lt;form&gt; &lt;input type=radio name=sexo value=&#39;&#39;&gt; masculino&lt;&#x2F;br&gt;&lt;input type=radio name=sexo value=&#39;&#39;&gt; femenino&lt;&#x2F;br&gt; &lt;&#x2F;form&gt;",\n  "FORM": "<form> <input type=radio name=sexo value=\'\'> masculino</br><input type=radio name=sexo value=\'\'> femenino</br> </form>"\n}';
      var source = 'begin form RBT "masculino" sexo = "" RBT "femenino" sexo = "" end.';
      var result = form.parse(source)
         
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Etiqueta', function() {
      var esperado = '{\n  "HTML": "&lt;form&gt; &lt;pre&gt;Esto es una etiqueta&lt;&#x2F;pre&gt;&lt;&#x2F;br&gt; &lt;&#x2F;form&gt;",\n  "FORM": "<form> <pre>Esto es una etiqueta</pre></br> </form>"\n}';
      var source = 'begin form "Esto es una etiqueta" end.';
      var result = form.parse(source)
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Boton', function() {
      var esperado = '{\n  "HTML": "&lt;form&gt; &lt;button type=&#39;button id=&#39;submit&#39; &#39;&gt;Submit&lt;&#x2F;button&gt;&lt;&#x2F;br&gt; &lt;&#x2F;form&gt;",\n  "FORM": "<form> <button type=\'button id=\'submit\' \'>Submit</button></br> </form>"\n}';
      var source = 'begin form BTN "Submit" submit end.';
      var result = form.parse(source)
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Lista Desplegable (Combobox)', function() {
      var esperado = '{\n  "HTML": "&lt;form&gt; &lt;select id =pais&gt; &lt;option value=&quot;Spain&quot;&gt;Spain&lt;&#x2F;option&gt; \\n,,,,,&lt;option value=&quot;Germany&quot;&gt;Germany&lt;&#x2F;option&gt; \\n,,,,,&lt;option value=&quot;Poland&quot;&gt;Poland&lt;&#x2F;option&gt; \\n,,,,,&lt;option value=&quot;UK&quot;&gt;UK&lt;&#x2F;option&gt; \\n&lt;&#x2F;select&gt;&lt;&#x2F;br&gt;&lt;&#x2F;br&gt;&lt;&#x2F;br&gt; &lt;&#x2F;form&gt;",\n  "FORM": "<form> <select id =pais> <option value=\\"Spain\\">Spain</option> \\n,,,,,<option value=\\"Germany\\">Germany</option> \\n,,,,,<option value=\\"Poland\\">Poland</option> \\n,,,,,<option value=\\"UK\\">UK</option> \\n</select></br></br></br> </form>"\n}';
      var source = 'begin form cbx pais = "Spain" ,"Germany" ,"Poland" ,"UK"; end.';
      var result = form.parse(source)
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Error', function() {
      var esperado = 'SyntaxError: Expected "FORM", "HEAD", "OPTIONS", "form", "head", "options" or [ \t\n\r] but "e" found.';
      var source = 'begin end.';
      var result = form.parse(source)
      
      //assert.match (JSON.stringify(result,undefined,2), /SyntaxError/)
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
});