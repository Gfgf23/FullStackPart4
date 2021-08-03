require('dotenv').config()
const blogsRouter = require('express').Router()
const Blog = require('./blog')
const User = require('./user')
const jwt = require('jsonwebtoken')


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  console.log(authorization)
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}


blogsRouter.get('/', async (request, response)  => {
  const blogs = await Blog.find({}).populate('user',{username:1,name:1})
  
  response.json(blogs)
})

blogsRouter.post('/', async (request, response)  => {
  const body = request.body 
  
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  
  
  const blog = new Blog({
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes,
			user: body.userId
  })

  const savedBlog = await blog.save()
  
  user.blogs = user.blogs.concat(savedBlog)
  await user.save()
  
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request,response) => {
	const id =request.params.id
    await Blog.findByIdAndRemove(id)
	response.status(204).end()
})

blogsRouter.put('/:id', async (request,response) => {
	const id =request.params.id
    
	const body = request.body
	
	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes
}

	const result = await Blog.findByIdAndUpdate(id,blog,{ new:true,runValidators: true })
	response.json(result)
})


module.exports = blogsRouter