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

blogsRouter.post("/", (request, response) => {
	const blog = new Blog(request.body)

	blog
		.save()
		.then(result => {
			console.log("post-pyynnön result", result)
			response.status(201).json(result)
		})
})

module.exports = blogsRouter