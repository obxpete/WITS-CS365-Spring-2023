const express = require('express');
const app = express();

app.get('/', function(request, response) {
    response.send('Hello from my  app');
})

app.listen(process.env.port || 3000, function() {
    console.log('App started');
});