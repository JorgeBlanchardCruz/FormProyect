desc "Run server"
task :default => [:use_keys, :web] do
  sh "rackup"
end

desc "Compile form.pegjs browser version"
task :web do
  sh "pegjs -e form public/lib/form.pegjs public/js/form.js"
end

desc "Remove form.pegjs"
task :clean do
  sh "rm -f public/js/form.js"
end

desc "Save config.yml out of the CVS"
task :keep_secrets do
  sh "cp config/config_template.yml config/config.yml "
end

desc "Use the filled client_secrets"
task :use_keys do
  sh "cp config/config_filled.yml config/config.yml"
end

desc "Go to console.developers.google"
task :link do
  sh "open https://console.developers.google.com/project/apps~form-proyect/apiui/api"
end

desc "Commit changes"
task :ci, [ :message ] => :keep_secrets do |t, args|
  message = args[:message] || ''
  sh "git ci -am '#{message}'"
end

task :testf do
  sh " open -a firefox tests/tests.html"
end

task :tests do
  sh " open -a safari tests/tests.html"
end

desc "Open browser in GitHub repo"
task :github do
  sh "open https://github.com/alu0100536591/FormProyect"
end

