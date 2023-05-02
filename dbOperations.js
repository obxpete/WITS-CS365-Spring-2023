var config = require('./dbConfig');
const sql = require('mssql');

// GET ALL TASKS
async function getTasks() 
{
    let pool = await sql.connect(config);
    let tasks = await pool.request().query(" select taskID, task, taskDueDate from tasks");
    return tasks
}

// GET A TASK
async function getTask(taskID) 
{
    let pool = await sql.connect(config);
    let task = await pool.request().query(`select taskID, task from tasks where taskID = ${taskID}`);
    return task
}

// ADD A TASK
async function addTask(task, taskDueDate) 
{
    let pool = await sql.connect(config);
    let newTask = await pool.request().query(`INSERT INTO tasks (task, taskDueDate) VALUES ('${task}', '${new Date(taskDueDate).toDateString()}') `);
    return newTask // sql just returns the task object it created
}

// UPDATE A TASK
async function updateTask(taskObj) 
{
    let pool = await sql.connect(config);
    let result = await pool.request().query(`UPDATE tasks set task = '${taskObj['task']}', taskDueDate = '${new Date(taskObj['taskDueDate']).toDateString()}' where taskID = ${taskObj['taskID']}; `);
    return result // sql just returns the task object it created
}

// Delete A TASK
async function deleteTask(taskID) 
{
    let pool = await sql.connect(config);
    let result = await pool.request().query(`delete tasks where taskID = '${taskID}'; `);
    return result // sql just returns the task object it created
}

module.exports =  {
    getTasks : getTasks,
    getTask: getTask,
    addTask: addTask,
    // replace this line with updateTask export
    updateTask: updateTask,
    deleteTask: deleteTask
}



