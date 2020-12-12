const express = require('express');
const swaggerDocument = require('./testmeanAPI-v1.0.json');
const swaggerUi = require('swagger-ui-express');
const League = require('../models/league');
const Team = require('../models/team');
const Player = require('../models/player');
const router = express.Router();

module.exports = router;

router.get('/leagues', (req, res) => {
	League.find({}, 'name sport')
		.sort({ name: 1 })
		.exec()
		.then((leagues) => {
			res.status(200).json(leagues);
		})
		.catch((err) => {
			res.status(400).json({ message: 'leagues not found', error: err });
		});
});

router.get('/teams/findByLeague', (req, res) => {
	const leagueId = req.query.leagueId;

	League.findById(leagueId, 'teams')
		.then((league) => {
			console.log('league ' + Array.isArray(league.teams));

			Team.find({}, 'name thumbnail')
				.where('_id')
				.in(league.teams)
				.exec()
				.then((teams) => {
					res.status(200).json(teams);
				})
				.catch((err) => {
					res.status(400).json({ message: 'There is no team in league id : ${leagueId}', error: err });
				});
		})
		.catch((err) => {
			console.log('err ' + err);
			res.status(400).json({ message: `There is no league with id : ${leagueId}`, error: err });
		});
});

router.get('/players/findByTeam', (req, res) => {
	const teamId = req.query.teamId;

	console.log('teamId  ' + teamId);
	Team.findById(teamId, 'players')
		.then((team) => {
			console.log('team ' + Array.isArray(team.players));

			Player.find()
				.where('_id')
				.in(team.players)
				.exec()
				.then((players) => {
					res.status(200).json(players);
				})
				.catch((err) => {
					res.status(400).json({ message: 'There is no player in team id : ${teamId}', error: err });
				});
		})
		.catch((err) => {
			console.log('err ' + err);
			res.status(400).json({ message: `There is no Team with id : ${teamId}`, error: err });
		});
});

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
