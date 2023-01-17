import { useState } from 'react'

import { Link, Route, Routes, useMatch } from 'react-router-dom'
import Menu from './components/Menu'
import Footer from './components/Footer'
import About from './pages/About'
import CreateNew from './pages/CreateNew'
import Anecdote from './pages/Anecdote'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const match = useMatch("/anecdotes/:id")
  const anecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === Number(match.params.id))
    : null

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
      </Routes>
      <Footer />
    </div>
  )
}
  
const AnecdoteList = ({ anecdotes }) => (
    <div>
        <h2>Anecdotes</h2>
        <ul>
        {anecdotes.map(anecdote =>
            <li key={anecdote.id}>
                <Link key={anecdote.id} to={`/anecdotes/${anecdote.id}`}>
                    {anecdote.content}
                </Link>
            </li>
        )}
        </ul>
    </div>
)

export default App



/*
  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

const [notification, setNotification] = useState('')

*/
