$:.unshift "."
require 'sinatra'
require "sinatra/reloader" if development?
require 'sinatra/flash'
require 'form_proyect'
require 'auth'
require 'pp'

get '/tests' do
  erb :tests
end

get '/video' do
  erb :video
end

enable :sessions
set :session_secret, '*&(^#234)'
set :reserved_words, %w{grammar test login auth}
set :max_files, 5        # no more than max_files+1 will be saved

helpers do
  def current?(path='/')
    (request.path==path || request.path==path+'/') ? 'class = "current"' : ''
  end
end

get '/grammar' do
  erb :grammar
end

get '/logout' do
  old_user = session[:name]
  session[:name] = "Login"
  session[:auth] = nil
  session[:image] = "img/user.jpg"
  session[:url] = nil
  flash[:notice] = %Q{<div class="success">Bye, #{old_user}</div>}
  redirect back
end

get '/:selected?' do |selected|
  puts "*************@auth*****************"
  puts session[:name]
  pp session[:auth]
  programs = FormProyect.all
  pp programs
  puts "selected = #{selected}"
  c  = FormProyect.first(:name => selected)
  user = session[:name] 
  img = session[:image]
  url = session[:url]
  email = session[:email]
  source = if c then c.source else "begin 
    \n\thead Formulario
    \n\toptions
    \n\t\tlogo \"img/github.png\"
    \n\n\tform\n\t\t
    \n\tlbl \"Esto es un test de complejidad intelectual de prueba.\"
    \n\t\"Fuente: psicologia-online.com\"
    \n\t-
    \n
    \n\t\"En primera instancia, introduzca sus datos personales:\";
    \n\ttxt \"Nombre y Apellidos: \" nombreap = \"\";
    \n\ttxt \"Pais de origen:     \" pais = \"Spain\";
    \n\ttxt \"Provincia:          \" provincia = \"S/C Tenerife\";
    \n\tcbx \"Edad:               \" edad = \"Seleccione uno\", \"entre 10-18\", \"entre 19-25\", \"entre 26-31\", \"entre 31-45\", \"mayor 45\";
    \n\tcbx \"Nivel de estudios:  \" estudios = \"Seleccione uno\", \"Sin estudios\", \"Estudios medios\", \"Estudios universitarios\";
    \n\t
    \n\t\"Sexo\"
    \n\ttable 50
    \n\t\trbt \"Hombre\" sexo
    \n\t\trbt \"Mujer\" sexo
    \n\tendtable;
    \n\t
    \n\t\"Por favor, responda con franqueza a las siguientes cuestiones.\";;
    \n\ttable 3
    \n\t\"5 = Totalmente de acuerdo.\" \"4 = De acuerdo.\" \"3 = Ni a favor ni en contra.\"
    \n\t\"2 = En desacuerdo.\" \"1 = Totalmente en desacuerdo.\" ;
    \n\tendtable;
    \n\t
    \n\ttable 7
    \n\t;;\"5\" \"4\" \"3\" \"2\" \"1\"
    \n\t\"1  \" \"Intento evitar a la gente complicada  \"                     rbt s1  rbt s1  rbt s1  rbt s1  rbt s1
    \n\t\"2  \" \"Creo en la importancia del arte\"                            rbt s2  rbt s2  rbt s2  rbt s2  rbt s2
    \n\t\"3  \" \"Prefiero la variedad a la rutina\"                           rbt s3  rbt s3  rbt s3  rbt s3  rbt s3
    \n\t\"4  \" \"Evito argumentaciones y conversaciones filosoficas\"         rbt s4  rbt s4  rbt s4  rbt s4  rbt s4
    \n\t\"5  \" \"Llevo la conversacion a un nivel mas elevado\"               rbt s5  rbt s5  rbt s5  rbt s5  rbt s5
    \n\t\"6  \" \"Raramente le busco un significado mas profundo a las cosas\" rbt s6  rbt s6  rbt s6  rbt s6  rbt s6
    \n\t\"7  \" \"Me encanta idear nuevas formas de hacer las cosas\"          rbt s7  rbt s7  rbt s7  rbt s7  rbt s7
    \n\t\"8  \" \"No me interesan las argumentaciones y conversaciones teoricas\"rbt s8  rbt s8  rbt s8  rbt s8  rbt s8
    \n\t\"9  \" \"Disfruto escuchando nuevas ideas\"                           rbt s9  rbt s9  rbt s9  rbt s9  rbt s9
    \n\t\"10 \" \"No estoy interesado en ideas abstractas\"                    rbt s10  rbt s10  rbt s10  rbt s10  rbt s10
    \n\tendtable;
    \n\t-
    \n\t
    \n\ttable 2
    \n\tbtn \"Enviar\" Enviar btn \"Borrar respuestas\" Borrar
    \n\t
    \nend." 
  end
  erb :index, 
      :locals => {  :programs => programs, :source => source, 
                    :user => user, :img => img, :url => url, :email => email }
end

post '/save' do
  pp params
  name = params[:fname]
  if session[:auth] # authenticated
    if settings.reserved_words.include? name  # check it on the client side
      flash[:notice] = 
        %Q{<div class="error">Can't save file with name '#{name}'.</div>}
      redirect back
    else 
      c  = FormProyect.first(:name => name)
      if c
        c.source = params["input"]
        c.save
      else
        if FormProyect.all.size >= settings.max_files
          c = FormProyect.all.sample
          c.destroy
        end
        c = FormProyect.create(
          :name => params["fname"], 
          :source => params["input"])
      end
      flash[:notice] = 
        %Q{<div class="success">File saved as #{c.name} by #{session[:name]}.</div>}
      pp c
      redirect to '/'+name
    end
  else
    flash[:notice] = 
      %Q{<div class="error">You are not authenticated.<br />
         Sign in with Google or Facebook.
         </div>}
    redirect back
  end
end

post '/delete' do
  pp params
  name = params[:fname]
  if session[:auth] # authenticated
    if settings.reserved_words.include? name  # check it on the client side
      flash[:notice] = 
        %Q{<div class="error">Can't save file with name '#{name}'.</div>}
      redirect back
    else 
      c  = FormProyect.first(:name => name)
      if c
        c.source = params["input"]
        c.destroy
        flash[:notice] = 
        %Q{<div class="success">File deleted as #{c.name} by #{session[:name]}.</div>}
      else
        flash[:notice] = %Q{<div class="error">Not exist file.</div>}
      end
      pp c
      redirect to '/'+name
    end
  else
    flash[:notice] = 
      %Q{<div class="error">You are not authenticated.<br />
         Sign in with Google or Facebook.
         </div>}
    redirect back
  end
end
