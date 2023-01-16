import { useSelector, useDispatch } from "react-redux"
import { addAnecdote, voteAnecdote } from "../reducers/anecdoteReducer"
import { deleteNotification, voteNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteAnecdote(id))
        dispatch(voteNotification
            (anecdotes.find((anecdote) => anecdote.id === id))
        )
        setTimeout(() => {
            dispatch(deleteNotification())
        }, 5000)
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList