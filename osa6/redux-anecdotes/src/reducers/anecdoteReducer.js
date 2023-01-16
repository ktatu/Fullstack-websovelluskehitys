import { createSlice } from '@reduxjs/toolkit'

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

export const { addAnecdote, setAnecdotes, voteAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer