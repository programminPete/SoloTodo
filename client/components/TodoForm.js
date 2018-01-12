import React, {PropTypes} from 'react';
class TodoForm extends React.Component {
  // const defaultOption = options[0]
  componentDidMount() {
    console.log('todoForm')
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.addTodo}>
        <select id="project" onChange={this.props.handleSelectChange} value={this.props.project}>
          <option value="all">all</option>
          <option value="general">general</option>
          <option value="programming">programming</option>
          <option value="moving">moving</option>
          <option value="household">household</option>
          <option value="Rasp Pi">Rasp Pi</option>
          <option value="chores">chores</option>
          </select>
        <br />
        <label>
          Recurring:
          <input
            id="recurring"
            name="recurring"
            type="checkbox"
            checked={this.props.recurring}
            onChange={this.props.handleInputChange} />
        </label>
        <br />
          <input
            id="todo-box"
            name="value"
            type="text"
            placeholder="give me a todo"
            onChange={this.props.handleInputChange} />
          <input id="submit" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default TodoForm;