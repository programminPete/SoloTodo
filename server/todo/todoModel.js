const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const todoSchema = new Schema({
  todoItem: {type: String},
  complete: {type: Boolean},
  recurring: {type: Boolean},
  project: {type: String},  
  idNum: {type: Number},
  notTodo: {type: Boolean},  
  year: {type: Number},
  month: {type: Number},
  day: {type: Number}
});

module.exports = mongoose.model('Item', todoSchema);
