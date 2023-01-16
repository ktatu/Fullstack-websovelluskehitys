import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
    name: "anecdotes",
    initialState: [],
    reducers: {
        addVote(state, action) {
            const votedAnecdoteId = action.payload

            return state
                .map(
                    (anecdote) => anecdote.id !== votedAnecdoteId
                        ? anecdote
                        : { ...anecdote, votes: anecdote.votes + 1 }
                )
                .sort((obj1, obj2) => obj2.votes - obj1.votes)
        },
        addAnecdote(state, action) {
            const anecdote = action.payload
            state.push(anecdote)
        },
        setAnecdotes(state, action) {
            return action.payload
        }
    }
})

export const createAnecdote = (anecdoteText) => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.create(anecdoteText)
        dispatch(addAnecdote(newAnecdote))
    }
}

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}


export const voteAnecdote = (anecdote) => {
    return async dispatch => {
        const updatedAnecdote = await anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 })
        dispatch(addVote(updatedAnecdote.id))
    }
}

export const { addAnecdote, setAnecdotes, addVote } = anecdoteSlice.actions
export default anecdoteSlice.reducer