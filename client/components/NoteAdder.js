import React from 'react';
import TextareaAutosize from "react-textarea-autosize";


class NoteAdder extends React.Component {

  render() {
    return (
      <div>
      <TextareaAutosize
        minRows={3}
        maxRows={6}
        placeholder="enter notes..."
      />
      </div>
    );
  }
}

export default NoteAdder;