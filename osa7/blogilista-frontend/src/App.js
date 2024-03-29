import { useState, useEffect, useRef, useMemo } from "react"

import Blog from "./components/Blog"
import LoginForm from "./components/LoginForm"
import NewBlogForm from "./components/NewBlogForm"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"

import blogService from "./services/blogs"
import loginService from "./services/login"
import userService from "./services/user"

import { createTheme, ThemeProvider } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

import { useDispatch, useSelector } from "react-redux"
import { setNotification } from "./reducers/notificationReducer"
import {
    addBlog,
    initializeBlogs,
    deleteBlog,
    updateBlog,
} from "./reducers/blogReducer"

import { Button, Container, Typography } from "@mui/material"

const App = () => {
    const blogs = useSelector((state) => state.blogs)
    const [user, setUser] = useState(null)

    const dispatch = useDispatch()

    const blogFormRef = useRef()

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [])

    useEffect(() => {
        const userFromStorage = userService.getUser()
        if (userFromStorage) {
            setUser(userFromStorage)
        }
    }, [])

    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")

    const theme = useMemo(
        (prefersDarkMode) =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? "dark" : "light",
                },
            }),
        [prefersDarkMode]
    )

    const login = async (username, password) => {
        loginService
            .login({
                username,
                password,
            })
            .then((user) => {
                setUser(user)
                userService.setUser(user)
                dispatch(
                    setNotification(
                        {
                            type: "success",
                            message: `${user.name} logged in!`,
                        },
                        5
                    )
                )
            })
            .catch(() => {
                dispatch(
                    setNotification(
                        {
                            type: "alert",
                            message: "wrong username/password",
                        },
                        5
                    )
                )
            })
    }

    const logout = () => {
        setUser(null)
        userService.clearUser()
        dispatch(setNotification({ type: "success", message: "good bye!" }))
    }

    const createBlog = async (blog) => {
        blogService
            .create(blog)
            .then((createdBlog) => {
                dispatch(
                    setNotification({
                        type: "success",
                        message: `a new blog '${createdBlog.title}' by ${createdBlog.author} added`,
                    })
                )
                dispatch(addBlog({ ...createdBlog, user }))
                blogFormRef.current.toggleVisibility()
            })
            .catch((error) => {
                dispatch(
                    setNotification({
                        type: "alert",
                        message:
                            "creating a blog failed: " +
                            error.response.data.error,
                    })
                )
            })
    }

    const removeBlog = (id) => {
        const toRemove = blogs.find((b) => b.id === id)

        const ok = window.confirm(
            `remove '${toRemove.title}' by ${toRemove.author}?`
        )

        if (!ok) {
            return
        }

        dispatch(deleteBlog(id))
    }

    const likeBlog = async (id) => {
        const toLike = blogs.find((b) => b.id === id)
        const liked = {
            ...toLike,
            likes: (toLike.likes || 0) + 1,
            user: toLike.user.id,
        }

        dispatch(updateBlog(liked.id, liked))
    }

    if (user === null) {
        return (
            <ThemeProvider theme={theme}>
                <Container maxWidth="md">
                    <Notification />
                    <LoginForm onLogin={login} />
                </Container>
            </ThemeProvider>
        )
    }

    return (
        <Container maxWidth="md">
            <Typography variant="h2">Blogs</Typography>

            <Notification />

            <div>
                {user.name} logged in
                <Button onClick={logout}>logout</Button>
            </div>

            <Togglable buttonLabel="new note" ref={blogFormRef}>
                <NewBlogForm onCreate={createBlog} />
            </Togglable>

            <div id="blogs">
                {blogs.map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        likeBlog={likeBlog}
                        removeBlog={removeBlog}
                        user={user}
                    />
                ))}
            </div>
        </Container>
    )
}

export default App
