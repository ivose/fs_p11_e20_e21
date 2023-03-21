import React from 'react'
import Search from './Search'
import PersonList from './PersonList'
import NewPerson from './NewPerson'
import Notification from '../varia/Notification'

const Book = (props) => {
  return (
    <div>
      <h1 className="greenItalic">Phonebook</h1>
      <Notification message={props.alertmsg} className={props.alertclass} />
      <Search
        handleSearchSubmit={props.handleSearchSubmit}
        search={props.search}
        handleSearchChange={props.handleSearchChange}
        searchResults={props.searchResults}
      />
      <PersonList
        searchResults={props.searchResults}
        delPerson={props.delPerson}
      />
      <NewPerson
        addPerson={props.addPerson}
        newName={props.newName}
        handleNameChange={props.handleNameChange}
        newNumber={props.newNumber}
        handleNumberChange={props.handleNumberChange}
      />
    </div>
  )
}

export default Book
