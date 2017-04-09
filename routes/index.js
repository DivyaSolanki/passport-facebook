var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {

	if (req.isAuthenticated())
		return next();
	
	res.redirect('/');
}

module.exports = function(passport){

	
	router.get('/', function(req, res) {
		res.render('index.html');
	});
	
	 router.get('/profile', isAuthenticated, function(req, res){
		res.render('home.html', { user: req.user });
	}); 

	
	router.get('/signout', function(req, res) {
		req.session.destroy();
		res.redirect('/');
	});

	
	router.get('/login/facebook', 
		passport.authenticate('facebook', { 
			scope: ['public_profile']
		}
	));

	router.get('/login/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/profile',
			failureRedirect : '/'
		})
	);
	return router;
}





