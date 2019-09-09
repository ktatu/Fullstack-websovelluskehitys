import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const ShowVotes = ({selected, votes}) => {
    return (
        <p>has {votes[selected]} votes</p>
    )
}

const MostVoted = ({votes}) => {
    let max = 0
    let index = 0

    for (let i = 0; i < votes.length; i++) {
        if (votes[i] > max) {
            index = i
            max = votes[i]
        }
    }
    return (
        <p>{anecdotes[index]}</p>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVote] = useState(new Uint8Array(anecdotes.length))

    const voteForAnecdote = () => {
        const copy = [...votes]
        copy[selected] += 1
        return (
            setVote(copy)
        )
    }

    const updateAnectode = () => {
        let max = anecdotes.length
        let randomNumber = Math.floor(Math.random() * max)
        console.log(randomNumber)
    
        setSelected(randomNumber)
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>

            {props.anecdotes[selected]}
            <ShowVotes selected ={selected} votes ={votes} />
            <p>
                <Button onClick={() => updateAnectode()} text='update anecdote' />
                <Button onClick={() => voteForAnecdote()} text='vote' />
            </p>

            <h1>Anecdote with most votes</h1>

            <MostVoted votes={votes} />
        </div>
    )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
