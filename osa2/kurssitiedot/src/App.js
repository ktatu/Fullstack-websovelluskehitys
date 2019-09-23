import React from 'react'
import Course from './components/Course'

const App = ({courses}) => {

    let courseId = 1

    const renderCourses = () => courses.map(course =>
        <Course key={courseId++} course={course} />
    )
  
    return (
        <div>
            <h1>Web development curriculum</h1>
            {renderCourses()}
        </div>
    )
}

export default App