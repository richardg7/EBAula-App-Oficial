# EBAula-App-Oficial
http://www.portaldeeducacao.eb.mil.br/academico/
=================

Projeto customizado por Richard Guedes.

Linkedin: https://www.linkedin.com/in/richard-guedes/

--------------

Versões: 

NODE 8.10.0
IONIC 3.9.2
GULP 3.9.1
CORDOVA 8.1.2

--------------

Verifica a Versão do NODEJS: node -v

Instala a Versão do IONIC e ANGULAR: npm install -g ionic@3.9.2

Verifica a Versão do IONIC: ionic info

Instala a Versão do GULP: npm install -g gulp@3.9.1

Instala o CORDOVA: npm install -g cordova

Verifica a Versão do CORDOVA: cordova info

Instala as Dependências nativas de compilação para o Windows: npm install --global --production windows-build-tools

instalar o NÓGUP: npm install -g node-gyp

Verifica a Versão da Plataforma: cordova platforms

Verifica os Plugins do CORDOVA: ionic cordova plugin

Adiciona o ANDROID: cordova platform add android --save

Verifica os Requirimentos do ANDROID: cordova requirements android

Compila Debugando o ANDROID: cordova build android --verbose

Compitla o ANDROID: cordova run android 

Compila o ANDROID usando o IONIC: ionic cordova run android --prod --release

Executa o Aplicativo no Navegador: ionic serve -b

Modifica o GRADLE "Se for Necessário": npm i gradle --save-dev

------

Debug remoto e autoreload

Compila Debugando: ionic run android -l -c -s

------

Updating ionic and cordova

Atualiza a versão do ANDROID: cordova platform update android@6.3.0

Adiciona a versão do ANDROID: cordova platform add android@6.3.0

Atualiza o CORDOVA: npm update -g cordova

Atualiza o IONIC: npm update -g ionic

------

Update project platforms:

Remove a Plataforma ANDROID: ionic cordova platform remove android

Remove a Plataforma IOS: ionic cordova platform remove ios

Adiciona a Plataforma ANDROID: ionic cordova platform add android

Adiciona a Plataforma IOS: ionic cordova platform add ios

Remove um PLUGIN Especifico: cordova plugin rm "PLUGIN" --force

Adiciona um PLUGIN Especifico: cordova plugin add "PLUGIN"

Desinstala o IONIC "Se for Necessário": npm uninstall -g ionic

Limpa o CACHE do NPM "Se for Necessário": npm cache clean -f

ionic cordova platform rm browser/android/ios
ionic cordova platform add browser/android/ios

--------------

Compilar e Assinar Usando o IONIC: https://ionicframework.com/docs/intro/deploying/

configuração do Ambiente Ionic + Android no Windows: http://www.tiagoporto.com/blog/tutorial-de-configuracao-do-ambiente-ionic-android-no-windows/

--------------
echo "# EBAula-App-Oficial" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/richardg7/EBAula-App-Oficial.git
git push -u origin master
--------------
git remote add origin https://github.com/richardg7/EBAula-App-Oficial.git
git push -u origin master

=================
Moodle Mobile
=================

This is the primary repository of source code for the official Moodle Mobile app.

* [User documentation](http://docs.moodle.org/en/Moodle_Mobile)
* [Developer documentation](http://docs.moodle.org/dev/Moodle_Mobile)
* [Development environment setup](http://docs.moodle.org/dev/Setting_up_your_development_environment_for_Moodle_Mobile_2)
* [Bug Tracker](https://tracker.moodle.org/browse/MOBILE)
* [Release Notes](http://docs.moodle.org/dev/Moodle_Mobile_Release_Notes)

License
-------

[Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0)

Big Thanks
-----------

Cross-browser Testing Platform and Open Source <3 Provided by [Sauce Labs](https://saucelabs.com)

![Sauce Labs Logo](https://user-images.githubusercontent.com/557037/43443976-d88d5a78-94a2-11e8-8915-9f06521423dd.png)