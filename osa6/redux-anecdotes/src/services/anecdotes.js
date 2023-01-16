import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
    const res = await axios.get(baseUrl)

    return res.data
}

const create = async (anecdoteText) => {
    const anecdote = asObject(anecdoteText)
    const res = await axios.post(baseUrl, anecdote)

    return await res.data
}

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export default { create, getAll }