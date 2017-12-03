import React from 'react';
import Title from './Title';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import Dropdown from 'react-dropdown';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      value: '',
      recurring: false,
      project: 'general',
      text: '',
      count: 0,
      completed: false,
      delete: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    
    this.addTodo = this.addTodo.bind(this); 
    this.loadTodos = this.loadTodos.bind(this);
    // this.deleteTodo = this.deleteTodo.bind(this); 
  }
  componentDidMount() {
    this.loadTodos();
  }
    // Handle the todos
  handleInputChange(e){
    // e.preventDefault();         
    const target = e.target;
    console.log('target: ', target)
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log('name, value: ', name + value)
    this.setState({
      [name]: value
    })
  };
  // Handle the todos
  handleSelectChange(e){
    e.preventDefault();         
    this.setState({project: e.target.value});
  };
  
  handleDelete(e){
    e.preventDefault();         
    const target = e.target;
    console.log('target: ', target);
    const name = target.name;
    console.log('name, value: ', name + value)
    this.setState({delete: true})
  };

  addTodo(e){   // review how you're doing this -- should probably be doing a copy here
    let counter = this.state.count + 1
    e.preventDefault();
    if(counter === 1) this.state.data = [];
    // Date stuff: 
    let timeNow = new Date();
    let fullDate = timeNow.getFullYear() + '-' + (timeNow.getMonth() + 1) + '-' + timeNow.getDate();    
    let year = timeNow.getFullYear()
    let month = timeNow.getFullYear() + '-' + (timeNow.getMonth() + 1) + '-' + timeNow.getDate();
    let day = timeNow.getDate()
    // assemble data for todo
    const todo = {
      todoItem: this.state.value,
      complete: false,
      recurring: this.state.recurring,
      project: this.state.project,
      idNum: this.state.count,
      notTodo: false,
      year: year,
      month: month,
      day: day
    }
    console.log('timeNow: ', timeNow);
    console.log('day: ', day);
    console.log('todo.day: ', todo.day);
    
    //update data
    this.state.data.push(todo);
    
    //make push to database
    fetch('http://localhost:8080/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.data[this.state.count])
    }).then((res) => {
      console.log("this is res", res)
    }).catch((err) => {
      console.log(err)
    })
    //update state

    this.setState({
      // sendTodo: false,
      data: this.state.data,
      value: '',
      project: 'general',
      recurring: false,
      count: counter
    });
  }

  loadTodos(){
    fetch('http://localhost:8080/api').then(function(res){
      return res.json();
    }).then((myBlob) => {
      if(myBlob.loadedTodos.length){
        // console.log(myBlob.loadedTodos);
        let dbTodos = [];
        myBlob.loadedTodos.map( (item) => dbTodos.push(item))
        // console.log('dbTodos: ', dbTodos);
        this.setState({
          data: myBlob.loadedTodos,
          count: myBlob.loadedTodos.length
        })
      }else{
        // console.log('database empty, set data to null')
        this.setState({data: null})
      }
    })
    // console.log()
    // fetch('http://localhost:8080/api', {
    // method: 'GET',
    // headers: {
    //   'Content-Type': 'application/json'
    // }
    // }).then((res) => {
    //   console.log("this is res on load", res)
    // }).catch((err) => {
    //   console.log(err)
    // })
  }
  // TODO: remove todo handler
  // deleteTodo(e){
  //   console.log(e);
  // TODO: filterResults
  render() {  
    console.log(this.state)  
    return (
      <div className="main">
      <div className="left">
        <Title />
        <TodoForm 
          value={this.state.value}
          recurring={this.state.recurring}
          project={this.state.project}
          handleInputChange={this.handleInputChange}
          handleSelectChange={this.handleSelectChange}
          addTodo={this.addTodo} />
          {/* deleteTodo={this.deleteTodo} /> */}
        </div>
      <div className="todo-main">
        <TodoList
          delete={this.state.delete}
          todos={this.state.data}
        />
      </div>
      <div className="right-margin">
      </div>
      </div>
    );
  }
}

export default App;