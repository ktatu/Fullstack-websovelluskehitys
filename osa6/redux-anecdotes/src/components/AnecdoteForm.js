import { addAnecdote } from "../reducers/anecdoteReducer"
import { useDispatch } from "react-redux"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const add = (event) => {
        event.preventDefault()
    
        const anecdote = event.target.anecdote.value
        event.target.value = ""
    
        dispatch(addAnecdote(anecdote))
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

export default AnecdoteForm