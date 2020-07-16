const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
const helper = require("./test_helper")

jest.setTimeout(10000)

beforeEach(async () => {
	const blogsToAdd = helper.initialBlogs

	const saveBlogs = async () => {
		for (let blog of blogsToAdd) {
			let blogObject = new Blog(blog)
			await blogObject.save()
		}
	}
	await Promise.all([Blog.deleteMany({}), saveBlogs()])
})

describe("GET-request / blog-retrieval tests", () => {
	test("get-request returns correct amount of blogs as json", async () => {
		const res = await api.get("/api/blogs")
			.expect(200)
			.expect("Content-Type", /application\/json/)
			
		expect(res.body).toHaveLength(6)
	})

	test("field _id doesnt exist in retrieved blogs", async () => {
		let blogs = await helper.blogsFromDatabase()
		expect(blogs[0]._id).toBeFalsy()
	})

	test("field id exists in retrieved blogs", async () => {
		let blogs = await helper.blogsFromDatabase()
		expect(blogs[0].id).toBeDefined()
	})
})

describe("POST-request / blog-saving related tests", () => {
	test("post-request receives 201 status and Content-Type is application/json", async () => {
		await api
			.post("/api/blogs")
			.send(helper.testBlog)
			.expect(201)
			.expect("Content-Type", /application\/json/)
	
		const res = await api.get("/api/blogs")
		
		const blogsFromDbWithoutId = helper.blogsWithoutId(res.body)
	
		expect(blogsFromDbWithoutId).toContainEqual(helper.testBlog)
		expect(blogsFromDbWithoutId).toHaveLength(helper.initialBlogs.length + 1)
	})

	test("blog added without field 'likes' defaults to 0 likes", async () => {
		let blogToAdd = { ...helper.testBlog }
		delete blogToAdd.likes

		const req = await api.post("/api/blogs").send(blogToAdd)
		const res = await api.get("/api/blogs")
		const blogsFromDbWithoutId = helper.blogsWithoutId(res.body)

		Promise.all([req, res, blogsFromDbWithoutId])
	
		expect(blogsFromDbWithoutId).toContainEqual(helper.testBlog)
	})

	test("blog without field 'title' doesnt get saved", async () => {
		await api.post("/api/blogs")
			.send(helper.blogWithFieldRemoved(helper.testBlog, "title"))
			.expect(400)
	})

	test("blog without field 'url' doesnt get saved", async () => {
		await api.post("/api/blogs")
			.send(helper.blogWithFieldRemoved(helper.testBlog, "url"))
			.expect(400)
	})
})

afterAll(() => {
	mongoose.connection.close()
})