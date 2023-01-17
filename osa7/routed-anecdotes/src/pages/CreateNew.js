import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useField } from "../hooks"

const CreateNew = ({ addNew, addNotification }) => {
    const navigate = useNavigate()
    const content = useField("text")
    const author = useField("text")
    const info = useField("text")
  
    const handleSubmit = (e) => {
      e.preventDefault()
      addNew({
        content: content.inputVariables.value,
        author: author.inputVariables.value,
        info: info.inputVariables.value,
        votes: 0
      })
      addNotification("a new anecdote " + content.inputVariables.value + " created!")
      navigate("/")
    }

    const resetFields = () => {
        content.reset()
        author.reset()
        info.reset()
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...content.inputVariables} />
          </div>
          <div>
            author
            <input {...author.inputVariables} />
          </div>
          <div>
            url for more info
            <input {...info.inputVariables} />
          </div>
          <button>create</button>
        </form>
        <button onClick={resetFields}>reset</button>
      </div>
    )
  
}

export default CreateNew