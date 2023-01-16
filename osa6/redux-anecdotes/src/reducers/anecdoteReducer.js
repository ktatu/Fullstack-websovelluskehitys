import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
    name: "anecdotes",
    initialState: [],
    reducers: {
        voteAnecdote(state, action) {
            const id = action.payload

            return state
                .map(
                    (anecdote) => anecdote.id !== id
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

export const createAnecdote = (content) => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.create(content)
        dispatch(addAnecdote(newAnecdote))
    }
}

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const { addAnecdote, setAnecdotes, voteAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer