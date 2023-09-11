const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const methodOverride = require('method-override')
const logger = require('morgan')
const flash = require('express-flash')
const mainRoutes = require('./routes/main')
const postsRoutes = require('./routes/posts')

const connectDB = require('./config/database')

//Use .env file in the config folder
require('dotenv').config({path: './config/.env'})

//Passport
require('./config/passport')(passport)

//Connect to database
connectDB()

//Set EJS in views
app.set('view engine', 'ejs')

//Set Static folder
app.use(express.static('public'))

//Body Parsing JSON
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//Logging
app.use(logger('dev'))

//Use forms for put / delete
app.use(methodOverride('_method'))


//Setup sessions = stored in MongoDB
app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({mongoUrl: process.env.MONGO_URI})
		})
	)

//Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

//Use flash messages for success/errors in login
app.use(flash())

//Routes
app.use('/', mainRoutes)
app.use('/posts', postsRoutes)

//Server running
app.listen(process.env.PORT, () => {
	console.log(`Server is on ${process.env.PORT}`)
})