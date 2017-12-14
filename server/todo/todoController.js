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

/**
* createItem - create a new Item model and then save the user to the database.
*
* @param req - http.IncomingRequest
* @param res - http.ServerResponse
*/
todoController.createItem = (req, res, next) => {

  let newItem = new Item;
  // console.log('createItem req.body: ', req.body);
  newItem.todoItem = req.body.todoItem;
  newItem.complete = req.body.complete;  
  newItem.recurring = req.body.recurring;
  newItem.project = req.body.project;
  newItem.idNum = req.body.idNum;  
  // console.log('newItem to save: ', newItem);
  
  newItem.save(function(error){
    if(error){
      console.log('Error saving: ', {error});
    }else{
      // console.log('successfully saved item: ', req.body[0])
      res.addOn = 'hello from dB';
      next();
    }
  })
};

/**
* verifyUser - Obtain username and password from the request body, locate
* the appropriate user in the database, and then authenticate the submitted password
* against the password stored in the database.
*
* @param req - http.IncomingRequest
* @param res - http.ServerResponse
*/
todoController.UpdateItem = (req, res, next) => {
  // write code here
  console.log('updateItem: ', req.body);
  // var query  = Item.where({ 'idNum': req.body.idNum});
  // query.findOne(function (err, item) {
  //   if (err) console.log("error");
  //   if (item) {
  //     if(item.id === req.body.id){
  //       // update to match;
  //       item.todoItem = req.body.text;
  //       item.recurring = req.body.recurring;
  //       item.project = req.body.project;
  //       next();
  //     }else{
  //       res.status(200);
  //       res.end();
  //     }
  //   }
  // });
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