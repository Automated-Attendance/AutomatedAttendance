import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import Auth0Strategy from './auth/Auth0';
import Auth0 from './auth/Auth0Helpers';
import cloudinary from 'cloudinary';
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'shhhhhhhhh', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '../dist')));

/****************/
/**** Auth0 ****/
/****************/

app.get('/login', Auth0.login);
app.get('/callback', Auth0.authVerify, Auth0.success);
app.get('/logout', Auth0.logout);


/****************/
/**** Wildcard ****/
/****************/

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

/****************/
/**** Cloudinary ****/
/****************/


app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on port 3000.');
});

module.exports = app;