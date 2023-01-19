import { useState } from "react"
import { Box, Button, TextField } from "@mui/material"

const NewBlogForm = ({ onCreate }) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        onCreate({ title, author, url, likes: 0 })
        setAuthor("")
        setTitle("")
        setUrl("")
    }

    return (
        <div>
            <h2>Create new</h2>

            <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection="row">
                    <TextField
                        required
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                        id="outlined-name"
                        label="title"
                    />
                    <TextField
                        required
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                        id="outlined-name"
                        label="author"
                    />
                    <TextField
                        required
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                        id="outlined-name"
                        label="url"
                    />
                </Box>
                <Button variant="outlined" id="create-butto" type="submit">
                    create
                </Button>
            </form>
        </div>
    )
}

export default NewBlogForm
