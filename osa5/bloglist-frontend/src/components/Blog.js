import React, { useState } from 'react'

const Blog = ({blog}) => {
    const [expandedBlogViewState, setExpandedBlogViewState] = useState(false)

    const handleBlogView = (event) => {
        setExpandedBlogViewState(!expandedBlogViewState)
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
                likes {blog.likes} <button>like</button>
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