const Item = require('./todoModel');
const bodyParser = require('body-parser');

const todoController = {};

/**
* getAllTodos
*
* @param next - Callback Function w signature (err, items)
*/
todoController.getAllTodos = (req, res, next) => {
  Item.find({}, function(error, data){
    req.body.loadedTodos = data;
    next();
  });
};

todoController.getProjectTodos = (req, res, next) => {
  console.log('req.query.project, complete: ', req.query.project, req.query.complete);
  if(!req.query.project || req.query.project === 'all'){
    if(req.query.complete === 'all'){
      Item.
      find({}, function(error, data){
        req.body.loadedTodos = data;
        next();
      });
    }else{
      Item.
      find().
      where('complete').equals(req.query.complete). 
      // could add a sort right here to sory by priority
      exec(function(error, data){
        req.body.loadedTodos = data;
        next();
      });
    }
  }else{
    if(req.query.complete === 'all'){
      Item.
      find().
      where('project').equals(req.query.project).
      // could add a sort right here to sory by priority
      exec(function(error, data){
        req.body.loadedTodos = data;
        next();
      });
    }else{  
      Item.
      find().
      where('project').equals(req.query.project).
      where('complete').equals(req.query.complete). 
      // could add a sort right here to sory by priority
      exec(function(error, data){
        req.body.loadedTodos = data;
        next();
      });
    }  
  }
};

/**
* createItem - create a new Item model and then save the user to the database.
*
* @param req - http.IncomingRequest
* @param res - http.ServerResponse
*/
todoController.createItem = ((req, res, next) => {
  let newItem = new Item;
  newItem.todoItem = req.body.todoItem;
  newItem.complete = req.body.complete;  
  newItem.recurring = req.body.recurring;
  newItem.project = req.body.project;
  newItem.idNum = req.body.idNum;  

  newItem.save(function(err){
    if(err){
      console.log('Error saving: ', {err});
    }else{
      // console.log('successfully saved item: ', req.body[0])
      res.addOn = 'hello from dB';
      next();
    }
  })
});

/**
* verifyUser - Obtain username and password from the request body, locate
* the appropriate user in the database, and then authenticate the submitted password
* against the password stored in the database.
*
* @param req - http.IncomingRequest
* @param res - http.ServerResponse
*/
todoController.completeItem = (req, res, next) => {
  // console.log('completeItem: ', req.body);
  Item.findByIdAndUpdate(req.body._id, { $set: { complete: !req.body.complete }}, function(err){
    if(err) res.send(err);
    next();
  });
};

todoController.deleteItem = (req, res, next) => {
  console.log('delete Item', req.body)
  //note: was req.params.id
  Item.findByIdAndRemove(req.body._id, function(err){
    if(err){
      res.send(err)
    }else{
      res.json({message: 'item deleted'});
      next();
    }
  })
}


module.exports = todoController;