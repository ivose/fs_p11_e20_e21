import React from 'react'

const NewNote = (props) => {
  return (
    <div>
      <form onSubmit={props.addNote}>
        <input value={props.newNote} onChange={props.handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}
export default NewNote
