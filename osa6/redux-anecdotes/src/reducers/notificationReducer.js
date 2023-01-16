import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: "initial state" }

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        createNotification(state, action) {
            const notificationText = action.payload
            state.message = notificationText
        },
        deleteNotification(state, action) {
            state.message = ""
        }
    }
})

let timeoutId

export const setNotification = (notificationText, duration) => {
    return dispatch => {
        dispatch(createNotification(notificationText))
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => 
            {
                dispatch(deleteNotification())
            },
        duration * 1000)      
    }
}

export const { createNotification, deleteNotification } = notificationSlice.actions
export default notificationSlice.reducer