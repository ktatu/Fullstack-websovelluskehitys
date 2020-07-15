const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
const helper = require("./test_helper")

jest.setTimeout(10000)

const initialBlogs = [ { title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7 }, 
	{ title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5 }, 
	{ title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12 }, 
	{ title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10 }, 
	{ title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0 }, 
	{ title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2 }
]

beforeEach(async () => {
	await Blog.deleteMany({})

	for (let blog of initialBlogs) {
		let blogObject = new Blog(blog)
		await blogObject.save()
	}
})

test("get-request returns correct amount of blogs as json", async () => {
	const res = await api.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/)
		
	expect(res.body).toHaveLength(6)
})

test("field _id doesnt exist in blogs", async () => {
	let blogs = await helper.blogsFromDatabase()
	expect(blogs[0]._id).toBeFalsy()
})

test("field id exists in blogs", async () => {
	let blogs = await helper.blogsFromDatabase()
	expect(blogs[0].id).toBeDefined()
})

afterAll(() => {
	mongoose.connection.close()
})