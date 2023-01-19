import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const blogSlice = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return sortByLiked(action.payload)
        },
        addBlog(state, action) {
            console.log("action payload ", action.payload)
            state.push(action.payload)
        },
        removeBlog(state, action) {
            const blogId = action.payload
            return sortByLiked(state.filter((blog) => blog.id !== blogId))
        },
        replaceBlog(state, action) {
            const newBlog = action.payload
            return sortByLiked(
                state.map((blog) => (blog.id !== newBlog.id ? blog : newBlog))
            )
        },
    },
})

const sortByLiked = (blogs) =>
    blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const deleteBlog = (blogId) => {
    return async (dispatch) => {
        await blogService.remove(blogId)
        dispatch(removeBlog(blogId))
    }
}

export const updateBlog = (blogId, newBlog) => {
    return async (dispatch) => {
        const updatedBlog = await blogService.update(blogId, newBlog)
        dispatch(replaceBlog(updatedBlog))
    }
}

export const { addBlog, setBlogs, removeBlog, replaceBlog } = blogSlice.actions
export default blogSlice.reducer
