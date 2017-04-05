import express from 'express';
import passport from 'passport';
const router = express.Router();

const env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL
};

const passportMiddleware = passport.authenticate('auth0', { failureRedirect: '/failed-login' });

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Automation Attendance', env: env });
});

router.get('/login', (req, res) => {
  res.render('login', { env: env });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/callback', passportMiddleware, (req, res) => {
  res.redirect('/wedidit');
});

module.exports = router;