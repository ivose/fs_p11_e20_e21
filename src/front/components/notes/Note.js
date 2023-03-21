import React from 'react'

const Note = (props) => {
  const label = props.note.important ? 'make not important' : 'make important'
  return (
    <li>
      <span>{props.note.content}</span>
      <button onClick={(e) => props.toggleImportance(e, props.note.id)}>
        {label}
      </button>
      <button
        onClick={(e) => props.deleteNote(e, props.note.id, props.note.content)}
      >
        Delete
      </button>
    </li>
  )
}
export default Note
