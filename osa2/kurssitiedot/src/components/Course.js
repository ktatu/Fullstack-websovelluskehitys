import React from 'react'

const Header = props =>
  <h2>{props.course}</h2>

const Total = ({parts}) => {
  let total = parts.reduce((sum, part) => sum + part.exercises, 0) 

  console.log('totaali on :', total);

  return <p><b>yhteensä {total} tehtävää</b></p>
}
  
const Course = ({course}) => {
    return (
        <div>
            <h1>Iso otsikko</h1>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Part = ({part}) => {
    return (
        <p>{part.name} {part.exercises}</p>
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

export default Course