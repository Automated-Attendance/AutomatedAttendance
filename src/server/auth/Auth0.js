import passport from 'passport';
import Auth0Strategy from 'passport-auth0';

// Configure Passport to use Auth0
/* istanbul ignore next */
var strategy = new Auth0Strategy({
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  callbackURL: process.env.AUTH0_CALLBACK_URL
}, function(accessToken, refreshToken, extraParams, profile, done) {
  return done(null, profile);
});

passport.use(strategy);

/* istanbul ignore next */
passport.serializeUser(function(user, done) {
  done(null, user);
});

/* istanbul ignore next */
passport.deserializeUser(function(user, done) {
  done(null, user);
});

// ignoring as Auth0 strategies tested by Auth0 themselves