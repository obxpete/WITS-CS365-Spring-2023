const express = require('express');
const app = express();

app.get('/', function(request, response) {

    response.send('Hello World!'); // add <h1> tag.  then change to function call helloClass()
})

var port = process.env.PORT ||  8090;
app.listen(port);
console.log('API is running at + http://localhost:' + port)



// function helloClass() {
//     let classNames = ["Devorah Leah Caplan", "Adina Ehrlich", "Shira Ely", "Yehudis Wenger", "Tzippora Weiskopf", "Leora Samuels","Zahava Rosenbaum", "Rochel Neuberger", "Shoshana Linzer", "Rechel Langer", "Yael Kibel", "Chava Glickstein"];
    
//     return  classNames.join(' and <br> ');
    
// }