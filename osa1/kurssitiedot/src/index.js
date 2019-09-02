import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
      <Header course={course} />

      <Content name={part1} amount={exercises1} 
      name2={part2} amount2={exercises2} 
      name3={part3} amount3={exercises3} />

      <Total first={exercises1} second={exercises2} third={exercises3} />
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
      <Part name={props.name} amount={props.amount} />
      <Part name={props.name2} amount={props.amount2} />
      <Part name={props.name3} amount={props.amount3} />    
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.name} {props.amount}</p>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.first + props.second + props.third}</p>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
