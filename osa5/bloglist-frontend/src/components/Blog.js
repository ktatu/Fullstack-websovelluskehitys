import React, { useState } from 'react'

const Blog = ({ blog, addLike }) => {
    const [expandedBlogViewState, setExpandedBlogViewState] = useState(false)

    const handleBlogView = (event) => {
        setExpandedBlogViewState(!expandedBlogViewState)
    }

    const handleLikeButton = (event) => {
        event.preventDefault()

        let newLikes = blog.likes += 1
        addLike({ ...blog, likes: newLikes, user: blog.user.id })
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        paddingBottom: 5,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const MinimalBlogView = () => {
        return (
            <div>
                {blog.title} {blog.author} <button onClick={handleBlogView}>View</button>
            </div>
        )
    }

    const ExpandedBlogView = () => {
        return (
            <div>
                {blog.title} {blog.author} <button onClick={handleBlogView}>Hide</button>
                <br />
                {blog.url}
                <br />
                likes {blog.likes} <button onClick={handleLikeButton}>like</button>
                <br />
                {blog.author}
            </div>
        )
    }

    return (
        <div style={blogStyle}>
            {expandedBlogViewState
                ? <ExpandedBlogView />
                : <MinimalBlogView />
            }
        </div>
    )
}

export default Blog