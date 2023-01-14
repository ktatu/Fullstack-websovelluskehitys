import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: "initial state" }

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        createNotification(state, action) {
            const anecdote = action.payload
            state.message = "you added " + anecdote
        },
        voteNotification(state, action) {
            const anecdote = action.payload.content
            state.message = "you voted " + anecdote
        },
        deleteNotification(state) {
            state.message = ""
        }
    }
})

export const { createNotification, deleteNotification, voteNotification } = notificationSlice.actions
export default notificationSlice.reducer