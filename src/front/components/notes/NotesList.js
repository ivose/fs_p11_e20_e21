import React from 'react'
import Note from './Note'

const NotesList = (props) => {
  return (
    <div>
      <ul>
        {props.notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            deleteNote={props.deleteNote}
            toggleImportance={props.toggleImportance}
          />
        ))}
      </ul>
    </div>
  )
}

export default NotesList
