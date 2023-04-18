const express = require('express');
const app = express();

app.get('/', function(request, response) {
    response.send('Hello from my  app');
})

var port = process.env.PORT ||  8090;
app.listen(port);
console.log('API is running at + http://localhost:' + port + '/api/tasks')