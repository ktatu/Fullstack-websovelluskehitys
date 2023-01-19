import { useState } from "react"
import { Button, TextField, Typography, Stack, Box } from "@mui/material"

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        onLogin(username, password)
    }

    return (
        <Stack spacing={5}>
            <Typography variant="h2">Log in to application</Typography>

            <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection="row">
                    <TextField
                        id="outlined-name"
                        required
                        label="Username"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                    <TextField
                        id="outlined-password-name"
                        required
                        label="Password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </Box>
                <Button
                    sx={{ marginTop: "10px" }}
                    variant="outlined"
                    id="login-button"
                    type="submit"
                >
                    login
                </Button>
            </form>
        </Stack>
    )
}

export default LoginForm
