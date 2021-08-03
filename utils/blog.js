const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
const logger = require('./logger')
const url = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URL
  : process.env.MONGODB_URL

console.log('connecting to', url)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(result =>  {
	logger.info('connected to MongoDB')
})
.catch((error) =>{
	logger.error('error connecting to MongoDB',error.message)
}) 

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
	  type: mongoose.Schema.Types.ObjectId,
	  ref: 'User'
  }
})

blogSchema.plugin(uniqueValidator)

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Blog', blogSchema)