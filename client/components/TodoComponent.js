import React, {PropTypes} from 'react';

class TodoComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      disabled: true
    }
    this.handleDoubleClickLower = this.handleDoubleClickLower.bind(this)
  }
  handleDoubleClickLower(e){
    let currentId = e.target.id
    let tempTodos = this.state.data.slice();
    
    console.log('double clicked me')
    console.log(e.target.id)
    let itemToEdit = tempTodos.find(function (item){
      return item._id === currentId
    })
    itemToEdit.editable = true;
    // this.setState({})
    // this.setState({disabled:false})
  }
  // if (!this.props.todos) {
  //     return <div />
  //   }
  render() {
    console.log(this.props)

    return (
      <div>
        <input className="item" id={todo._id} onDoubleClick={this.handleDoubleClickLower}/>
      </div>
    )
  }
}

export default TodoComponent;
