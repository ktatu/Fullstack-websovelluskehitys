const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", (request, response) => {
	console.log("get request api/blogs")
	Blog
		.find({})
		.then(blogs => {
			response.json(blogs)
		})
})

blogsRouter.post("/", (request, response, next) => {
	const blog = new Blog(request.body)

	blog
		.save()
		.then(result => {
			console.log("post-pyynnön result", result)
			response.status(201).json(result)
		})
		.catch(error => next(error))
})

blogsRouter.delete("/:id", async (request, response) => {
	await Blog.findByIdAndDelete(request.params.id)
	response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
	const body = request.body
	const updatedBlog = { ...body }
	console.log("updatedBlog", updatedBlog)

	const blogFromDb = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
	response.json(blogFromDb)
})

module.exports = blogsRouter