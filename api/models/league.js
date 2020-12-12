const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema({
	name: String,
	sport: String,
	teams: Array
});

module.exports = mongoose.model('Leagues', leagueSchema);
