import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, review }) => (
    <button onClick={onClick}>
        {review}
    </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const leaveGoodReview = () => setGood(good +1)

  return (
    <div>
        <Button onClick={leaveGoodReview} review='good' />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)