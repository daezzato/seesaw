const mongoose = require('mongoose')
mongoose.set('strictQuery', false);

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI.toString())
		console.log(`MongoDB connected: ${conn.connection.host}`)

	} catch (err) {
			console.error(err)
			process.exit(1)
	}
}

module.exports = connectDB