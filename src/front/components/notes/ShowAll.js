import React from 'react'

const ShowAll = (props) => {
  return (
    <div>
      <button onClick={props.handleShowAll}>
        show {props.showAll ? 'important' : 'all'}
      </button>
    </div>
  )
}

export default ShowAll
