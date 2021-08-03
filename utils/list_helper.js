const dummy = (blogs) => {
  return 1 
}

const totalLikes = (blogs) => {
	arrayOfLikes = blogs.map(blog => blog.likes)
	total = arrayOfLikes.reduce((sum,likes) => {
	return sum = likes 
})
	return total 
}

const favoriteBlog = (blogs => {
	if (blogs.length ===0)
		return null 
	let fav = blogs[0]
	blogs.forEach(blog => {
		if(blog.likes > fav.likes){
			fav = blog 
		}
	})
	
	return fav 
})

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}

