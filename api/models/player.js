const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
	name: String,
	position: String,
	thumbnail: String,
	signin: {
		amount: Number,
		currency: String
	},
	born: Date
});

module.exports = mongoose.model('Player', playerSchema);
