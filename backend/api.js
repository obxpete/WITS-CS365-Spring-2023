var express = require ('express');
var cors = require('cors');

var dbOperations = require('./dbOperations')
var bodyParser = require('body-parser');

var Task = require('./task'); // class definition

const  app  = express(); 
var router = express.Router();


app.unsubscribe(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/api', router);
app.use(cors());


router.use((request, response, next) =>{
    // add authentication and other logic as needed here.
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.route('/tasks').get((request, response) =>{
    let result;
    dbOperations.getTasks().then(result => {
        
        response.json(result)
    }) 
})

router.route('/task/:taskID').get((request, response) =>{
    let result;
    dbOperations.getTask(request.params.taskID).then(result => {
        response.json(result)
    }) 
})

router.route('/add').post((request, response) =>{
    let newTask = {... request.body};
    console.log(newTask)
    dbOperations.addTask(newTask['task'], newTask['taskDueDate']).then(result => {
        response.status(201).json(result)
    }) 
})

// Insert Update Route Here
router.route('/update/').post((request, response) =>{
    let task = {... request.body};
    console.log(task)

    dbOperations.updateTask({taskID: task.taskID,  task:task.task, taskDueDate: task.taskDueDate }).then(result => {
        response.status(201).json(result)
    }) 
})

// Insert Delete Route Here
router.route('/delete/:taskID').get((request, response) =>{
    let result
    dbOperations.deleteTask(request.params.taskID).then(result => {
        response.status(201).json(result)
    }) 
})

var port = process.env.PORT ||  8090;
app.listen(port);
console.log('Task API is running at + http://localhost:' + port + '/api/tasks')

