import React from 'react'
import Course from './components/Course'

const App = ({courses}) => {

    let courseId = 1

    const renderCourses = () => courses.map(course =>
        <Course key={courseId++} course={course} />
    )
  
    return (
        <div>
            {renderCourses()}
        </div>
    )
}

export default App