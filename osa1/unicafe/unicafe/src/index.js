import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, review }) => (
    <button onClick={onClick}>
        {review}
    </button>
)

const Headline = ({ header }) => (
    <h1>{header}</h1>
)

const Statistic = ({ reviewType, amount }) => (
    <tr>
        <td>{reviewType}</td>
        <td>{amount}</td>
    </tr>
)

const Statistics = ({all, positives, negatives, neutrals}) => {
    let average = 0
    let percentageOfPositives = 0

    all.forEach(value => {
        average += value
    })
    average = average / all.length
    percentageOfPositives = positives / all.length * 100

    if (all.length === 0) {
        return (
            <p>No feedback given</p>
        )
    } else {
        return (
            <table>
                <tbody>
                <Statistic reviewType='good' amount={positives} />
                <Statistic reviewType='neutral' amount={neutrals} />
                <Statistic reviewType='bad' amount={negatives} />

                <tr>
                    <td>all</td>
                    <td>{all.length}</td>
                </tr>
                <tr>
                    <td>average</td>
                    <td>{average}</td>
                </tr>
                <tr>
                    <td>positive</td>
                    <td>{percentageOfPositives} %</td>
                </tr>
                </tbody>
            </table>
        )
    }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState([])

  const leaveGoodReview = () => {
      setGood(good +1)
      setAll(all.concat(1))
  }

  const leaveNeutralReview = () => {
      setNeutral(neutral +1)
      setAll(all.concat(0))
  }

  const leaveBadReview = () => {
      setBad(bad +1)
      setAll(all.concat(-1))
  }

  return (
    <div>
        <Headline header='give feedback' />

        <Button onClick={leaveGoodReview} review='good' />
        <Button onClick={leaveNeutralReview} review='neutral' />
        <Button onClick={leaveBadReview} review='bad' />

        <Headline header='statistics' />

        <Statistics all={all} positives={good} neutrals={neutral} negatives={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
