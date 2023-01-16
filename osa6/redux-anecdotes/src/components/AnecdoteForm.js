import { createAnecdote } from "../reducers/anecdoteReducer"
import { createNotification, deleteNotification, setNotification } from "../reducers/notificationReducer"
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
    const add = async (event) => {
        event.preventDefault()

        const anecdoteText = event.target.anecdote.value
        event.target.value = ""

        props.createAnecdote(anecdoteText)
        props.setNotification("new anecdote " + anecdoteText, 5)
      }

    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={add}>
                <div><input name="anecdote"/></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default connect(null, { createAnecdote, setNotification })(AnecdoteForm)