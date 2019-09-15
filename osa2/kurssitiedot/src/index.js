import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'


const courses = [
    {
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
]

/*const Header = props =>
  <h1>{props.course}</h1>

const Total = ({parts}) => {
  let total = parts.reduce((sum, part) => sum + part.exercises, 0) 

  console.log('totaali on :', total);

  return <p>yhteensä {total} tehtävää</p>
}
  
const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Part = ({part}) => {
    return (
        <li>{part.name} {part.exercises}</li>
    )
}

const Content = ({parts}) => {
    return (
        parts.map(part =>
            <Part 
                key={part.id}
                part={part}
            />)
    )
}

const App = ({courses}) => {
    const courses = [
        {
          name: 'Half Stack application development',
          parts: [
            {
              name: 'Fundamentals of React',
              exercises: 10,
              id: 1
            },
            {
              name: 'Using props to pass data',
              exercises: 7,
              id: 2
            },
            {
              name: 'State of a component',
              exercises: 14,
              id: 3
            },
            {
              name: 'Redux',
              exercises: 11,
              id: 4
            }
          ]
        }, 
        {
          name: 'Node.js',
          parts: [
            {
              name: 'Routing',
              exercises: 3,
              id: 1
            },
            {
              name: 'Middlewares',
              exercises: 7,
              id: 2
            }
          ]
        }
      ]

    let courseId = 1

    const renderCourses = () => courses.map(course =>
        <Course key={courseId++} course={course} />
    )
  
    return (
      <div>
        {renderCourses()}
      </div>
    )
}*/

ReactDOM.render(
  <App courses={courses} />,
  document.getElementById('root')
)