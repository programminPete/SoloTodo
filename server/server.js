const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const todoController = require('./todo/todoController');

const app = express();
const PORT = 8080;

// const mongoURI = process.env.NODE_ENV === 'test' ? 'mongodb://localhost/unit11test' : 'mongodb://localhost/unit11dev';
// const mongoURI = 'mongodb://localhost:27017/mongodb-todo';  // where is this set?
const mongoURI = 'mongodb://student:ilovetesting@ds127936.mlab.com:27936/todo-db';
mongoose.connect(mongoURI);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(function(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
// })

app.use(express.static(path.join(__dirname, '../')));

// add new todo data to database
app.post('/api', todoController.createItem, todoController.getAllTodos, (req, res) => {
  console.log('post')
  res.status(200);
  res.end();
})
// get data on page load
app.get('/api', todoController.getAllTodos, (req, res) => {
  // console.log('/ get: ', req.body)
  console.log('get');
  res.status(200);
  res.send(req.body);
})
// get data sorted
app.get('/filtered', todoController.getProjectTodos, (req, res) => {
  // console.log('/ get: ', req.body)
  console.log('req query project: ', req.query.project)
  console.log('req query cfilter: ', req.query.complete)  
  console.log('get sorted');
  res.status(200);
  res.send(req.body);
})

// Delete Item by ID if checkbox clicked
app.delete('/api', todoController.deleteItem, (req,res) => {
  console.log('delete');
  res.status(200);
  res.send(req.body);
})

app.put('/api', todoController.completeItem, (req,res) =>{
  console.log('complete');
  res.status(200);
  res.send(req.body);
})


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
