const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })

    console.log("palautetaan blogit ", blogs)
    response.json(blogs.map((blog) => blog.toJSON()))
})

blogsRouter.post("/", async (request, response) => {
    const body = request.body

    console.log("token ------", request.token)
    console.log("user ------", request.user)

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: "token missing or invalid" })
    }
    let user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id,
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog.toJSON())
})

blogsRouter.delete("/:id", async (request, response) => {
    const blogToDelete = await Blog.findById(request.params.id)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: "token missing or invalid" })
    } else if (decodedToken.id.toString() !== blogToDelete.user.toString()) {
        return response
            .status(401)
            .json({ error: "user not authorized to delete this blog" })
    }

    await Blog.deleteOne(blogToDelete)
    response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
    const blog = request.body

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
        new: true,
        runValidators: true,
        context: "query",
    }).populate("user", { username: 1, name: 1 })

    response.json(updatedBlog)
})

module.exports = blogsRouter
