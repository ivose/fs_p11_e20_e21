import React from 'react'

const PersonList = (props) => {
  return (
    <ul>
      {props.searchResults.map((person, key) => {
        return (
          <li key={key}>
            <span>{person.name}: </span>
            <b>{person.number}</b>
            <button onClick={(e) => props.delPerson(e, person.id, person.name)}>
              Delete
            </button>
          </li>
        )
      })}
    </ul>
  )
}
export default PersonList
