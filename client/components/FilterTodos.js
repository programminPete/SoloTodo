import React from 'react';

class FilterTodos extends React.Component {

  render() {
    return (
      <div>
        <h4>Filters:</h4>
        <form>
          <div className="radio">
            <label>
              <input type="radio" value="all" 
                checked={this.props.cFilterOption==="all"} 
                onChange={this.props.handleCompleteFilterChange}/>
              All
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="false" 
                checked={this.props.cFilterOption==="false"} 
                onChange={this.props.handleCompleteFilterChange}/>
              Active
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="true" 
                checked={this.props.cFilterOption==="true"} 
                onChange={this.props.handleCompleteFilterChange}/>
              Completed
            </label>
          </div>
        </form>

          <br/>
          <label>By Project:
            <select name="pFilterOption" id="project" onChange={this.props.handleProjectFilterChange}>
              <option value="all">all</option>
              <option value="general">general</option>
              <option value="programming">programming</option>
              <option value="moving">moving</option>
              <option value="household">household</option>
              <option value="Rasp Pi">Rasp Pi</option>
              <option value="chores">chores</option>
            </select>
          </label>
      </div>
    );
  }
}

export default FilterTodos;


