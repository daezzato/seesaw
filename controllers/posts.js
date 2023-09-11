const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const User = require('../models/User')

module.exports = {

	//Get all the posts on the Home/Explore page
	getExplore: async (req, res) => {
		try {
			const allPosts = await Post.find().sort({createdAt: 'desc'}).populate('user').lean()   //Look through the Post model and sort them in a descending order
			res.render('explore.ejs', {allPosts: allPosts, user: req.user})
		} catch (err) {
				console.log(err)
		}
		
	},

	//View a single post in the Explore page
	explorePost: async (req, res) => {
		try {
			const post = await Post.findById(req.params.id).populate('user')    //Look through the Post model find the post based on its id
			res.render('explorePost.ejs', {post: post, user: req.user})
		} catch (err) {
				console.log(err)
		}
	},


	//Get all of the posts that the logged in user has created
	getMyPosts: async (req, res) => {
		try {
			const myPosts = await Post.find({user: req.user.id}).populate('user')   //Look through the post model and find all of the posts that were created by the user with the user id
			res.render('myPosts.ejs', {myPosts: myPosts, user: req.user})
		} catch (err) {
				console.log(err)
		}
	},

	//View a single post from the logged in user
	exploreMyPost: async (req, res) => {
		try {
			const myPost = await Post.findById(req.params.id)   //Look through the Post model to find the post with its own id
			res.render('exploreMyPost.ejs', {myPost: myPost, user: req.user})
		} catch (err) {
				console.log(err)
		}
	},

	//Get all of the posts that the user liked
	getFavourites: async (req, res) => {
		try {
			const favourites = await Post.find({ 'likedBy.user': req.user._id}).populate('user').lean()   //Look through the Post model and access the likedBy property and grab the user's id
			res.render('favourites.ejs', {favourites: favourites})
		} catch (err) {
				console.log(err)
		}
		
	},

	//Displays the page to add a post
	getAddPost: (req, res) => {
		res.render('addPost.ejs')
	},

	//Creates a new post
	createPost: async (req, res) => {
		try {
			//Upload image to cloudinary
			const cloudImage = await cloudinary.uploader.upload(req.file.path)

			await Post.create({                           //Creates a new document with the following properties that are filled in the form
				tripName: req.body.tripName,
				country: req.body.country,
				tripDates: [req.body.tripDates1, req.body.tripDates2],
				cities: req.body.cities,
				description: req.body.description,
				image: cloudImage.secure_url,
				cloudinaryId: cloudImage.public_id,
				likes: 0,
				user: req.user.id
			})
			console.log('Post created')
			res.redirect('/explore')

		} catch (err) {
				console.log(err)
		}
	},
	
	//Like a post
	likePost: async (req, res) => {
		try {
			await Post.findOneAndUpdate(    //Finds a post in the database with the provided id from the request parameters
				{_id: req.params.id },
				{ 
					$inc: {likes: 1},   //Increments the likes counter by 1 every time a user likes a photo
					$push: {likedBy: {user: req.user._id, likedAt: Date.now()}   //This pushes an object into the likedBy property in the Post model. It provides the name/id of the user who liked it along with when they liked it
				},
			}
			)
			console.log('Liked Post')
			res.redirect(`/explore/${req.params.id}`)
		} catch (err) {
				console.log(err)
		}
	},

	//Delete a post
	deletePost: async(req, res) => {
		try {
			let post = await Post.findById({_id: req.params.id})    //Finds a post in the database with the provided id from the request parameters
			await cloudinary.uploader.destroy(post.cloudinaryId)   //Uses Cloudinary to delete the image associated with the post. The post.cloudinaryId is used to identify the image
			await Post.remove({_id: req.params.id})     //Removes the post from the database using the provided id
			console.log('Post deleted')
			res.redirect('/myPosts')
		} catch (err) {
			res.redirect('/myPosts')
		}
	}
}