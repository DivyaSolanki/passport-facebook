
var mongoose = require('mongoose');
var con = require('./../db').connection();

module.exports = {
	User: con.model('User', {
		id: String,
		access_token: String,
		name: String,
		picture: String
	}), 
	closeConnection: function() {
	  con.close();
	}
}

