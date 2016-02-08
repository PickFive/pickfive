module.exports = {
 'facebookAuth': {
   'clientID': process.env.FACEBOOK_APP_ID,
   'clientSecret': process.env.FACEBOOK_APP_SECRET,
   'callbackURL': 'https://raive.herokuapp.com/auth/facebook/callback',
   'profileFields': ['id', 'email', 'name']
 } 
}
