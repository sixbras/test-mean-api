const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose').set('debug', true);

const connection = mongoose.connection;

const api = require('./api/v1/index.js');

app.set('port', process.env.port || 3000);
app.use(cors());

app.use((req, res, next) => {
	console.log(`req handled at ${new Date()}`);
	next();
});
app.use('/api/v1', api);

app.use((req, res) => {
	const err = new Error('404 not found');
	err.status = 404;
	err.msg = '404 not found !!';
	res.json(err);
});

mongoose.connect('mongodb://localhost:27017/testmean', { useNewUrlParser: true, useUnifiedTopology: true });

connection.on('error', () => {
	console.log(`Connection to mongoDB error at ${new Date()}`);
});

connection.once('open', () => {
	console.log(`${new Date()} mongoDB is up and running...`);

	app.listen(app.get('port'), () => {
		console.log(`App listening at http://localhost:${app.get('port')}`);
	});
});
