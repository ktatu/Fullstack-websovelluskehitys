import { useState } from "react"
import PropTypes from "prop-types"
import { Box, Button } from "@mui/material"

const BlogDetails = ({ blog, visible, likeBlog, removeBlog, own }) => {
    if (!visible) return null

    const addedBy = blog.user && blog.user.name ? blog.user.name : "anonymous"

    return (
        <div>
            <div>
                <a href={blog.url}>{blog.url}</a>
            </div>
            <div>
                {blog.likes} likes{" "}
                <Button variant="outlined" onClick={() => likeBlog(blog.id)}>
                    like
                </Button>
            </div>
            {addedBy}
            {own && (
                <Button variant="outlined" onClick={() => removeBlog(blog.id)}>
                    remove
                </Button>
            )}
        </div>
    )
}

const Blog = ({ blog, likeBlog, removeBlog, user }) => {
    const [visible, setVisible] = useState(false)

    const style = {
        padding: 3,
        margin: 5,
        borderStyle: "solid",
        borderWidth: 1,
    }

    return (
        <Box style={style} className="blog">
            {blog.title} {blog.author}
            <Button
                sx={{ marginLeft: "10px" }}
                variant="contained"
                onClick={() => setVisible(!visible)}
            >
                {visible ? "hide" : "view"}
            </Button>
            <BlogDetails
                blog={blog}
                visible={visible}
                likeBlog={likeBlog}
                removeBlog={removeBlog}
                own={blog.user && user.username === blog.user.username}
            />
        </Box>
    )
}

Blog.propTypes = {
    blog: PropTypes.shape({
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        likes: PropTypes.number.isRequired,
        user: PropTypes.shape({
            username: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        }),
    }).isRequired,
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
    }),
    likeBlog: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired,
}

export default Blog
