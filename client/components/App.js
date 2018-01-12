import React from 'react';
import Title from './Title';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import FilterTodos from './FilterTodos';
import NoteAdder from './NoteAdder';


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
      pFilterOption: 'all',
      cFilterOption: 'all'
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);    
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleComplete = this.handleComplete.bind(this);    
    this.handleDelete = this.handleDelete.bind(this);
    this.handleProjectFilterChange = this.handleProjectFilterChange.bind(this);
    this.handleCompleteFilterChange = this.handleCompleteFilterChange.bind(this);
    this.addTodo = this.addTodo.bind(this); 
    this.loadTodos = this.loadTodos.bind(this);
  }
  componentDidMount() {
    this.loadTodos();
  }
  componentDidMount() {
    this.loadTodos();
  }
     
  handleProjectFilterChange(e){
    const target = e.target;
    let value = target.value;
    this.setState({pFilterOption: value});
    this.loadTodos()
  }
  handleCompleteFilterChange(e){
    const target = e.target;
    let value = target.value;
    this.setState({cFilterOption: value});
    this.loadTodos()    
  }
  
    // Handle the todos
  handleInputChange(e){
    // e.preventDefault();         
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })
  };
  // Handle the todos
  handleSelectChange(e){
    e.preventDefault();         
    this.setState({project: e.target.value});
  };
  
  handleDoubleClick(e){
    let currentId = e.target.id
    let tempTodos = this.state.data.slice();
    
    console.log('double clicked me')
    console.log(e.target.id)
    let itemToEdit = tempTodos.find(function (item){
      return item._id === currentId
    })
    itemToEdit.editable = true;
    this.setState({})
    // this.setState({disabled:false})
  }

  handleMouseLeave(e){
    let currentId = e.target.id    
    let tempTodos = this.state.data.slice();    
    let itemToEdit = tempTodos.find(function (item){
      return item._id === currentId
    })
  }

  handleComplete(e){
    e.preventDefault();
    let currentId = e.target.id;
    let tempTodos = this.state.data.slice();
    let itemToComplete = tempTodos.find(function (item){
      return item._id === currentId;
    })
    //mark complete in database 
    fetch('http://localhost:8080/api', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(itemToComplete)
    }).then((res) => {
      console.log('this is res: ', res);
    }).catch((err) => {
      console.log('complete err: ', err);
    })
    // load latest
    this.loadTodos();    
  }
  // Delete a todo item if delete checkbox is clicked
  handleDelete(e){
    e.preventDefault();    
    let currentId = e.target.id
    let tempTodos = this.state.data.slice();
    let itemToDelete = tempTodos.find(function (item){
      return item._id === currentId
    })
    console.log('itemToDelete: ', itemToDelete)

    const target = e.target;
    const name = target.name;
    const value = e.value;    
    
    //delete from database
    fetch('http://localhost:8080/api', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(itemToDelete)
    }).then((res) => {
      console.log("this is res", res)
    }).catch((err) => {
      console.log(err)
    })

    this.loadTodos();
  };



  // Add todos to the database, update state
  addTodo(e){
    let counter = this.state.count + 1
    console.log(counter);
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
      day: day,
      editable: false
    }
    
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
  
  // load todos from database
  loadTodos(){
    let projectOption = this.state.pFilterOption;
    let completedOption = this.state.cFilterOption;
    console.log('projectOption: ', projectOption);
    console.log('completedOption: ', completedOption)  
    
    fetch(`http://localhost:8080/filtered?project=${projectOption}&complete=${completedOption}`).then(function(res){
      return res.json();
    }).then((myBlob) => {
      if(myBlob.loadedTodos.length){
        let dbTodos = [];
        myBlob.loadedTodos.map( (item) => dbTodos.push(item))
        console.log(myBlob)
        this.setState({
          data: myBlob.loadedTodos,
          count: myBlob.loadedTodos.length
        })
      }else{
        // console.log('database empty, set data to null')
        this.setState({data: null})
      }
    })
  }

  // TODO: filterResults

  // Render page
  render() {  
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
        </div>
      <div className="todo-main">
        <TodoList
          disabled={this.state.disabled}
          todos={this.state.data}
          handleDoubleClick={this.handleDoubleClick}
          handleMouseLeave={this.handleMouseLeave}
          handleComplete={this.handleComplete}
          handleDelete={this.handleDelete}
        />
      </div>
      <div className="right-margin">
        <FilterTodos
          pFilterOption = {this.state.pFilterOption}
          cFilterOption = {this.state.cFilterOption}
          handleProjectFilterChange = {this.handleProjectFilterChange}
          handleCompleteFilterChange = {this.handleCompleteFilterChange}
          loadTodos = {this.loadTodos}
        />
      </div>
      <div> 
        <h1>Notes to self</h1>
        <NoteAdder />
      </div>
      <div>
        <ul className="notes">
          <li>
            these todo-items should be color coded by project for better UX distinction
          </li>
          <li>
            format this to be on right side, smaller
          </li>
          <li>
            create a json file - and rewrite with each db call 
            -- then can reference that each time in "thumbnail app" view, where subset of data lives,
            or possible a component, --> and the whole big section is just the state store
            -- no, this isn't good for changing apps -- each "app" component should hold it's own state.
          </li>
          <li>
          note, productify: 
          -- only the 'app snapshot' section has to follow our template,
          once the app is loaded in main screen, you can make it whatever color scheme works
          for you
          </li>
          <li>
          An 'archive completed' option would be cool. 
          if you click it - completed todo items go to be archived, instead of 
          in completed section
          </li>
          <li>
          might be good to have a "click to touch" command helper section, 
          a lot of apps could be coming from click handlers, and an easy switch to 
          touch handlers would be helpful
          </li>
          <li>
          Also may be good to have a non-touch friendly version. 
          just static, but could still be helpful for people
          </li>
        </ul>
      </div>        
    </div>
    );
  }
}

export default App;