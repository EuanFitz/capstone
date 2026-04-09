const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const User = require('../model/User');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
}, async(accessToken, refreshToken, profile, done) =>{
    try{
        // first see if the google user id is in the database
        let user = await User.findOne({ googleId: profile.id});
        //No user? save them..
        if(!user) {
            user = new User ({
                username: profile.displayName,
                googleId: profile.id,
                role: 'user'
                //Sets them as a user by default
            });
            await user.save();
        }

        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));

module.exports = passport;