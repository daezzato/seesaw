const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const postsController = require('../controllers/posts')
const authController = require('../controllers/auth')
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main routes
router.get('/', homeController.getIndex)
router.get('/explore', ensureAuth, postsController.getExplore)
router.get('/explore/:id', ensureAuth, postsController.exploreMyPost)
router.get('/myPosts', ensureAuth, postsController.getMyPosts)
router.get('/myPosts/:id', ensureAuth, postsController.exploreMyPost)
router.get('/favourites', postsController.getFavourites)
router.get('/favourites/:id', ensureAuth, postsController.exploreMyPost)
router.get('/addPost', postsController.getAddPost)
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)
router.get('/logout', authController.logout)


module.exports = router
