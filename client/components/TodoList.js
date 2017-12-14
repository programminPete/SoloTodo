import React, {PropTypes} from 'react';

class TodoList extends React.Component {
  
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
              <span className="delete-header">x</span> 
            </div>
          </li>
          <hr/>
        {todos.map( (todo, idx) => {
          console.log(todo.idNum)
          console.log('true id: ', todo._id)
          return (
            <li className="list-item" key={idx}>
              <div className="list-item-grid"> 
                <span className="item">{todo.todoItem}</span>
                <span className="project">{todo.project}</span>
                <span className='delete'>
                  <input
                    id={idx}
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