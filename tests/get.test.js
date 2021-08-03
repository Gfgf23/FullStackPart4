const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')
const api = supertest(app)
const Blog = require('../utils/blog')
const initialBlogs = [
{
        title: "String",
        author: "String",
        url: "String",
        likes: 24,
        id: "60dbf9f5d7e1d433cc53bf9d"
    },
    {
        title: "String",
        author: "String",
        url: "String",
        likes: 24,
        id: "60dbf9fad7e1d433cc53bf9f"
    }
]
test('blogs are retured as json and have the correct length', async () => {
	const blogs = await api
	.get('/api/blogs')
	.expect('Content-Type', /application\/json/)
	
	
	expect(blogs.body).toHaveLength(
	initialBlogs.length
	)
	
})

test('Make sure that there is an id property the in blog', async () =>{
	const blogs = await api.get('/api/blogs')
	console.log('anything')
	expect(blogs.body[0].id).toBeDefined()
}
)

test('Make sure that blog post requets are correct', async () =>{
	const blogs = await api.post('/api/blogs',
	{
        title: "String",
        author: "String",
        url: "String",
        likes: 245
    }
	).expect(201)
	
	const newBlogs = await api.get('/api/blogs')
	
	expect(newBlogs.body).toHaveLength(
	initialBlogs.length + 1
	)
	
})

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save() 
  
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})
afterAll(() => {
  mongoose.connection.close()
}) 