const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
	tripName: {
		type: String,
		required: true
	},
	country: {
		type: String,
		required: true
	},
	tripDates: {
		type: [Date],
		required: true
	},
	cities: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	cloudinaryId: {
		type: String,
		required: true
	},
	likes: {
		type: Number,
    required: true,
  },
	likedBy: [
		{
			user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
			likedAt: {type: Date, default: Date.now}
		},
	],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }

})

module.exports = mongoose.model('Post', PostSchema)