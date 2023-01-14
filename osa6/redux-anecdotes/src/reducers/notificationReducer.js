import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: "initial state" }

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        createNotification(state, action) {
            state.notification = action.payload
            //return action.payload
        }
    }
})

export default notificationSlice.reducer