const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
	name: String,
	thumbnail: String,
	players: Array
});

module.exports = mongoose.model('Team', teamSchema);
