import React from 'react'

const Part = (props) => {
  return (
    <li>
      {props.name}&nbsp;
      <b>{props.exercises}</b>
    </li>
  )
}

export default Part
