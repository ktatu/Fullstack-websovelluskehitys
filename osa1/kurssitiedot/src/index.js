import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course={course.name} />
      <Content array={course.parts} />
      <Total array={course.parts} />
    </>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.array[0].name} amount={props.array[0].exercises} />
      <Part name={props.array[1].name} amount={props.array[1].exercises} />
      <Part name={props.array[2].name} amount={props.array[2].exercises} />    
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.name} {props.amount}</p>
  )
}

const Total = (props) => {
  let i = 0
  props.array.forEach(element => {
    i += element.exercises
  })
  return (
    <p>Total number of exercises {i}</p>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
