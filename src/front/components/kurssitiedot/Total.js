import React from 'react'

const Total = (props) => {
  const getSum = (props) => {
    return props.parts.length > 0
      ? props.parts.map((part) => part.exercises).reduce((a, b) => a + b, 0)
      : 0
  }
  return (
    <div>
      <h5>Number of exercises {getSum(props)}</h5>
    </div>
  )
}

export default Total
