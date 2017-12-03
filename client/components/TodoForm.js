import React, {PropTypes} from 'react';
class TodoForm extends React.Component {
  // const defaultOption = options[0]
  
  render() {
    return (
      <div>
        <form onSubmit={this.props.addTodo}>
        <select id="project" onChange={this.props.handleSelectChange} value={this.props.project}>
          <option value="general">general</option>
          <option value="programming">programming</option>
          <option value="moving">moving</option>
          <option value="household">household</option>
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
            value={this.props.value}
            onChange={this.props.handleInputChange} />
          <input id="submit" type="submit" value="Submit" />
          {/* <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" /> */}
        </form>
      </div>
    );
  }
}

export default TodoForm;