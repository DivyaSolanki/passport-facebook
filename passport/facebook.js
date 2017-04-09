var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('./../models/user').User;
var fbConfig = require('./../fb');

module.exports = function(passport) {

    passport.use('facebook', new FacebookStrategy({
        clientID        : fbConfig.appID,
        clientSecret    : fbConfig.appSecret,
        callbackURL     : fbConfig.callbackUrl,
	profileFields: ['id', 'displayName', 'photos', 'email']
    },

    // facebook will send back the tokens and profile
    function(access_token, refresh_token, profile, done) {

		process.nextTick(function() {

	        User.find({ 'id' : profile.id }, function(err, user) {

	            if (err)
	                return done(err);
	            if (user) {
	                return done(null, user);
	            } else {
	                var newUser = new User();
	                newUser.id = profile.id; 	                
	                newUser.access_token = profile.access_token; 
	                newUser.name  = profile.displayName; 
			newUser.picture = profile.photos[0].value;

	                newUser.save(function(err) {
				console.log(err);
	                    if (err)
	                        throw err;
	                    return done(null, newUser);
	                });
	            }

	        });
        });

    }));

};
