
run export PS1='${PWD/*\//} > '


steps:
- npm init -y
- inspect package.json
- npm install express
- app.js
- node app.js
- open port to public
