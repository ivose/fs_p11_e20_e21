import React from 'react'
import Course from './Course'

const Courses = (props) => {
  return (
    <div>
      <h1 className="greenItalic">Courses</h1>
      {props.courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  )
}

export default Courses