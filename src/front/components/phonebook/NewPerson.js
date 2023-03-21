import React from 'react'

const NewPerson = (props) => {
  return (
    <div>
      <h3 className="greenItalic">Add a new</h3>
      <form onSubmit={props.addPerson}>
        <div>
          <input value={props.newName} onChange={props.handleNameChange} placeholder="Name.." />
          <input value={props.newNumber} onChange={props.handleNumberChange} placeholder="Phone nr.." />
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default NewPerson
