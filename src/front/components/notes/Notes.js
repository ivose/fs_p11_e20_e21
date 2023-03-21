import React from 'react'
import ShowAll from './ShowAll'
import NotesList from './NotesList'
import NewNote from './NewNote'
import Notification from '../varia/Notification'

const Notes = (props) => {
  return (
    <div>
      <h1 className="greenItalic">Notes</h1>
      <Notification message={props.alertmsg} className={props.alertclass} />
      <ShowAll handleShowAll={props.handleShowAll} showAll={props.sshowAll} />
      <NotesList
        notesToShow={props.notesToShow}
        toggleImportance={props.toggleImportance}
        deleteNote={props.deleteNote}
      />
      <NewNote
        addNote={props.addNote}
        newNote={props.newNote}
        handleNoteChange={props.handleNoteChange}
      />
    </div>
  )
}

export default Notes
