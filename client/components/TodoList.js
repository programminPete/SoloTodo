import React, {PropTypes} from 'react';
import TodoComponent from './TodoComponent';

class TodoList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      disabled: true
    }
  }



  render() {
    if (!this.props.todos) {
      return <div />
    }
    let todos = this.props.todos;

    return (
      <div className="todo-list">
        <ul>
        {/* <li>{this.props.todos[0].text}</li> */}
          <li className="list-item-header">
            <div className="list-item-header-grid"> 
              <span className="item-header">ToDo Item</span> 
              <span className="project-header">Project</span>
              <span className="complete-header">O</span> 
              <span className="delete-header">x</span> 
            </div>
          </li>
          <hr/>
        {todos.map( (todo, idx) => {
          {/* console.log('true id: ', todo._id) */}
          return (
            <li className="list-item" key={idx}>
              <div className="list-item-grid"> 
                <span key={idx} id={todo._id} onDoubleClick={this.props.handleDoubleClick}>
                  <input className="item" id={todo._id} disabled={this.state.disabled} onMouseLeave={this.props.handleMouseLeave} placeholder={todo.todoItem}/>
                </span>
                <span className="project" id={todo._id} onDoubleClick={(e) => {this.props.handleDoubleClick(e)}}>
                  {todo.project}
                </span>
                <span className='complete'>
                  <input
                    id={todo._id}
                    name="complete"
                    type="checkbox"
                    checked={todo.complete}
                    onChange={ this.props.handleComplete } />
                </span>
                <span className='delete'>
                  <input
                    id={todo._id}
                    name="delete"
                    type="checkbox"
                    checked={this.props.delete}
                    onChange={ this.props.handleDelete } />
                </span>
              </div>
            </li>
            )
        })}
        </ul>
      </div>
    );
  }
}

export default TodoList;