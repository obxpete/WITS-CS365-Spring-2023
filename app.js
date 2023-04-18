const express = require('express');
// const helloClass = require('./modules/helloClass')

const app = express();

app.get('/', function(request, response) {
    response.send(helloClass()); // add helloClass.
})

var port = process.env.PORT ||  8090;
app.listen(port);
console.log('API is running at + http://localhost:' + port)


