var mongoose = require('mongoose');

var url = 'mongodb://localhost/test';

var connection = {
	
	_init: function() {
		mongoose.connect(url, { 
			config: {
				auto_reconnect: true, 
				autoIndex: false 
			} 
		});

		mongoose.connection.on('connected', function() {
		  	console.log("Connected With DB");
		});

		// If the connection throws an error
		mongoose.connection.on("error", function(err) {
		  console.error('Failed to connect to DB ' + url + ' on startup ', err);
		});

		// When the connection is disconnected
		mongoose.connection.on('disconnected', function () {
		  	console.log('Mongoose default connection to DB :' + url + ' disconnected');
		});
	},

	connection: function() {
		return mongoose.connection;
	},

	disconnect: function() {
		mongoose.connection.close();
		console.log("Disconnect Database");
	}
}

connection._init();

module.exports = connection;
