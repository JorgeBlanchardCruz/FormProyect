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
set :max_files, 3        # no more than max_files+1 will be saved

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
  puts "\n*****************************@auth*****************************"
  puts "\nName: #{session[:name]}"
  puts "\n***** Auth Hash " 
  pp session[:auth]
  programs = FormProyect.all(:user => session[:name])
  users = Login.all
  puts "\n***** Programs Stored  "
  pp programs
  puts "\n***** Selected "
  puts "selected = #{selected}"
  c  = FormProyect.first(:name => selected)
  user = session[:name] 
  img = session[:image]
  url = session[:url]
  email = session[:email]
  source = if c then c.source else "begin \n\thead Formulario\n\toptions
    \n\t\tlogo \"img/github.png\"\n\t\twidth 25\n\t\theight 25\n\n\tform\n\t\t
    txt \"etiqueta\" ident = \"valor por defecto\":\n\t
    RBT \"seleccione1\" radio1 = \"\" \n\tRBT \"seleccione2\" radio1 = \"\" \nend." end
  erb :index, 
      :locals => {  :programs => programs, :users => users, :source => source, 
                    :user => user, :img => img, :url => url, :email => email }
end

post '/save' do
  puts "\n*****************************save*****************************"
  pp params
  name = params[:fname]
  if session[:auth] # authenticated
    if settings.reserved_words.include? name  # check it on the client side
      flash[:notice] = 
        %Q{<div class="error">Can't save file with name '#{name}'.</div>}
      redirect back
    else 
      c  = FormProyect.first(:name => name, :user => session[:name])
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
          :user => session[:name],
          :source => params["input"],
          :login_user => session[:name])
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
    puts "\n*****************************delete*****************************"
  pp params
  name = params[:fname]
  if session[:auth] # authenticated
    if settings.reserved_words.include? name  # check it on the client side
      flash[:notice] = 
        %Q{<div class="error">Can't save file with name '#{name}'.</div>}
      redirect back
    else 
      c  = FormProyect.first(:name => name, :user => session[:name])
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
