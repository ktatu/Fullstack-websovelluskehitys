import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: "notification",
    initialState: {},
    reducers: {
        createNotification(state, action) {
            return { ...action.payload }
        },
        deleteNotification() {
            return {}
        },
    },
})

let timeoutId

export const setNotification = (notification, duration) => {
    return (dispatch) => {
        dispatch(createNotification(notification))
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            dispatch(deleteNotification())
        }, duration * 1000)
    }
}

export const { createNotification, deleteNotification } =
    notificationSlice.actions
export default notificationSlice.reducer
