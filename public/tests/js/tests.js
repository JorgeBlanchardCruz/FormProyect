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
      var esperado =  '[\n  {\n    "type": "FORM",\n    "value": [\n      {\n        "type": "TEL",\n        "label": "Telefono",\n        "value": "123456789"\n      }\n    ]\n  }\n]';
      var source = 'begin form tel "Telefono" telefono = "123456789" end.';
      var result = ast.parse(source);
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Fecha', function() {
      var esperado = '[\n  {\n    "type": "FORM",\n    "value": [\n      {\n        "type": "DAT",\n        "label": "Nacimiento",\n        "value": "15-10-87"\n      }\n    ]\n  }\n]';
      var source = 'begin form dat "Nacimiento" fecha = "15-10-87" end.';
      var result = ast.parse(source);
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
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
      var esperado = '[\n  {\n    "type": "FORM",\n    "value": [\n      {\n        "type": "CHX",\n        "label": null\n      },\n      {\n        "type": "LBL",\n        "value": "coche"\n      },\n      {\n        "type": "CHX",\n        "label": null\n      },\n      {\n        "type": "LBL",\n        "value": "bicicleta"\n      },\n      {\n        "type": "CHX",\n        "label": null\n      },\n      {\n        "type": "LBL",\n        "value": "otros"\n      }\n    ]\n  }\n]';
      var source = 'begin form CHX vehiculo "coche" CHX vehiculo "bicicleta" CHX vehiculo "otros" end.';
      var result = ast.parse(source);
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Radiobutton', function() {
      var esperado =  '[\n  {\n    "type": "FORM",\n    "value": [\n      {\n        "type": "RBT",\n        "label": "Hombre"\n      },\n      {\n        "type": "RBT",\n        "label": "Mujer"\n      }\n    ]\n  }\n]';
      var source = 'begin form rbt "Hombre" sexo rbt "Mujer" sexo end.';
      var result = ast.parse(source);
         
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Etiqueta', function() {
      var esperado = '[\n  {\n    "type": "FORM",\n    "value": [\n      {\n        "type": "LINE"\n      },\n      {\n        "type": "LBL",\n        "value": "Esto es una etiqueta"\n      }\n    ]\n  }\n]';
      var source = 'begin form - "Esto es una etiqueta" end.';
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
      var esperado = '[\n  {\n    "type": "FORM",\n    "value": [\n      {\n        "type": "CBX",\n        "id": "pais",\n        "value": "Spain, Germany, Poland, UK"\n      },\n      {\n        "type": "WHITELINE"\n      }\n    ]\n  }\n]';
      var source = 'begin form cbx pais = "Spain" ,"Germany" ,"Poland" ,"UK"; end.';
      var result = ast.parse(source);
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Error', function() {     
      assert.throws(function() { ast.parse('begin end.'); });
   });
});

//******************************************************************************************
suite('HTML', function() {
   test('Cabecero HTML', function() {
      var esperado = '{\n  "HTML": "&lt;h1 align=&#39;center&#39;&gt;Formulario&lt;&#x2F;h1&gt;&lt;form class=&#39;form&#39;&gt;  &lt;&#x2F;form&gt;",\n  "FORM": "<h1 align=\'center\'>Formulario</h1><form class=\'form\'>  </form>"\n}';
      var source = 'begin head Formulario form end.';
      var result = form.parse(source)
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });

   test('Cabecero con opciones HTML', function() {
      var esperado = '{\n  "HTML": "&lt;div align=&#39;center&#39;&gt;&lt;img src=&#39;img&#x2F;github.png&#39; height=&#39;30&#39; width=&#39;30&#39;&gt;&lt;&#x2F;div&gt;&lt;h1 align=&#39;center&#39;&gt;Formulario&lt;&#x2F;h1&gt;&lt;form class=&#39;form&#39;&gt;  &lt;&#x2F;form&gt;",\n  "FORM": "<div align=\'center\'><img src=\'img/github.png\' height=\'30\' width=\'30\'></div><h1 align=\'center\'>Formulario</h1><form class=\'form\'>  </form>"\n}';
      var source = 'begin head Formulario options logo "img/github.png" width 25 height 25 form end.';
      var result = form.parse(source)
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Linea en Blanco', function() {
      var esperado = '{\n  "HTML": "&lt;form class=&#39;form&#39;&gt; &lt;&#x2F;br&gt;&lt;&#x2F;br&gt;&lt;&#x2F;br&gt;&lt;&#x2F;br&gt; &lt;&#x2F;form&gt;",\n  "FORM": "<form class=\'form\'> </br></br></br></br> </form>"\n}';
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
      var esperado = '{\n  "HTML": "&lt;form class=&#39;form&#39;&gt; etiqueta &lt;input type=&#39;text&#39; name=&#39;ident&#39; placeholder=&#39;valor por defecto&#39;&gt;&lt;&#x2F;br&gt;&lt;&#x2F;br&gt;&lt;&#x2F;br&gt; &lt;&#x2F;form&gt;",\n  "FORM": "<form class=\'form\'> etiqueta <input type=\'text\' name=\'ident\' placeholder=\'valor por defecto\'></br></br></br> </form>"\n}';
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
      var esperado = '{\n  "HTML": "&lt;form class=&#39;form&#39;&gt; Telefono &lt;input type=&#39;tel&#39; name=&#39;telefono&#39; placeholder=&#39;123456789&#39;&gt;&lt;&#x2F;br&gt; &lt;&#x2F;form&gt;",\n  "FORM": "<form class=\'form\'> Telefono <input type=\'tel\' name=\'telefono\' placeholder=\'123456789\'></br> </form>"\n}';
      var source = 'begin form tel "Telefono" telefono = "123456789" end.';
      var result = form.parse(source)
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Fecha', function() {
      var esperado = '{\n  "HTML": "&lt;form class=&#39;form&#39;&gt; Nacimiento &lt;input type=&#39;date&#39; name=&#39;fecha&#39; placeholder=&#39;15-10-87&#39;&gt;&lt;&#x2F;br&gt; &lt;&#x2F;form&gt;",\n  "FORM": "<form class=\'form\'> Nacimiento <input type=\'date\' name=\'fecha\' placeholder=\'15-10-87\'></br> </form>"\n}';      
      var source = 'begin form dat "Nacimiento" fecha = "15-10-87" end.';
      var result = form.parse(source)
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Rango', function() {
      var esperado = '{\n  "HTML": "&lt;form class=&#39;form&#39;&gt;  &lt;input type=&#39;range&#39; name=&#39;rango&#39; placeholder=&#39;100&#39;&gt;&lt;&#x2F;br&gt; &lt;&#x2F;form&gt;",\n  "FORM": "<form class=\'form\'>  <input type=\'range\' name=\'rango\' placeholder=\'100\'></br> </form>"\n}';      
      var source = 'begin form RAG rango = "100" end.';
      var result = form.parse(source)
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Contraseña', function() {
      var esperado = '{\n  "HTML": "&lt;form class=&#39;form&#39;&gt;  &lt;input type=&#39;password&#39; name=&#39;password&#39; placeholder=&#39;gonzalo&#39;&gt;&lt;&#x2F;br&gt; &lt;&#x2F;form&gt;",\n  "FORM": "<form class=\'form\'>  <input type=\'password\' name=\'password\' placeholder=\'gonzalo\'></br> </form>"\n}';      
      var source = 'begin form PWD password = "gonzalo" end.';
      var result = form.parse(source)
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Checkbox', function() {
      var esperado = '{\n  "HTML": "&lt;form class=&#39;form&#39;&gt; &lt;input type=checkbox name=vehiculo &gt; &lt;&#x2F;br&gt;coche&lt;&#x2F;br&gt;&lt;input type=checkbox name=vehiculo &gt; &lt;&#x2F;br&gt;bicicleta&lt;&#x2F;br&gt;&lt;input type=checkbox name=vehiculo &gt; &lt;&#x2F;br&gt;otros&lt;&#x2F;br&gt; &lt;&#x2F;form&gt;",\n  "FORM": "<form class=\'form\'> <input type=checkbox name=vehiculo > </br>coche</br><input type=checkbox name=vehiculo > </br>bicicleta</br><input type=checkbox name=vehiculo > </br>otros</br> </form>"\n}';      
      var source = 'begin form CHX vehiculo "coche" CHX vehiculo "bicicleta" CHX vehiculo "otros" end.';
      var result = form.parse(source)
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Radiobutton', function() {
      var esperado = '{\n  "HTML": "&lt;form class=&#39;form&#39;&gt; &lt;input type=radio name=sexo &gt; Hombre&lt;&#x2F;br&gt;&lt;input type=radio name=sexo &gt; Mujer&lt;&#x2F;br&gt; &lt;&#x2F;form&gt;",\n  "FORM": "<form class=\'form\'> <input type=radio name=sexo > Hombre</br><input type=radio name=sexo > Mujer</br> </form>"\n}';      
      var source = 'begin form rbt "Hombre" sexo rbt "Mujer" sexo end.';
      var result = form.parse(source)
         
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Etiqueta', function() {
      var esperado = '{\n  "HTML": "&lt;form class=&#39;form&#39;&gt; Esto es una etiqueta&lt;&#x2F;br&gt; &lt;&#x2F;form&gt;",\n  "FORM": "<form class=\'form\'> Esto es una etiqueta</br> </form>"\n}';      
      var source = 'begin form "Esto es una etiqueta" end.';
      var result = form.parse(source)
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Boton', function() {
      var esperado = '{\n  "HTML": "&lt;form class=&#39;form&#39;&gt; &lt;button type=&#39;button id=&#39;submit&#39; &#39;&gt;Submit&lt;&#x2F;button&gt;&lt;&#x2F;br&gt; &lt;&#x2F;form&gt;",\n  "FORM": "<form class=\'form\'> <button type=\'button id=\'submit\' \'>Submit</button></br> </form>"\n}';      
      var source = 'begin form BTN "Submit" submit end.';
      var result = form.parse(source)
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Lista Desplegable (Combobox)', function() {
      var esperado = '{\n  "HTML": "&lt;form class=&#39;form&#39;&gt;  &lt;select id =pais&gt; &lt;option value=&quot;Spain&quot;&gt;Spain&lt;&#x2F;option&gt;\\n&lt;option value=&quot;Germany&quot;&gt;Germany&lt;&#x2F;option&gt;\\n&lt;option value=&quot;Poland&quot;&gt;Poland&lt;&#x2F;option&gt;\\n&lt;option value=&quot;UK&quot;&gt;UK&lt;&#x2F;option&gt;\\n&lt;&#x2F;select&gt;&lt;&#x2F;br&gt;&lt;&#x2F;br&gt;&lt;&#x2F;br&gt; &lt;&#x2F;form&gt;",\n  "FORM": "<form class=\'form\'>  <select id =pais> <option value=\\"Spain\\">Spain</option>\\n<option value=\\"Germany\\">Germany</option>\\n<option value=\\"Poland\\">Poland</option>\\n<option value=\\"UK\\">UK</option>\\n</select></br></br></br> </form>"\n}';      
      var source = 'begin form cbx pais = "Spain" ,"Germany" ,"Poland" ,"UK"; end.';
      var result = form.parse(source)
      
      assert.deepEqual (JSON.stringify(result,undefined,2), esperado);
   });
   test('Error', function() {
      assert.throws(function() { form.parse('begin end.'); });
   });
});