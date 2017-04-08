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
import cloud from './cloudinary/cloudHelpers';
import kairos from './kairosFR/kairosHelpers';
import search from './db/search.js';
import fileUpload from 'express-fileupload';
import user from './db/userHelpers';

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
app.use(express.static(path.join(__dirname, '/../public/dist')));
app.use(fileUpload());

/************************/
/**** Authentication ****/
/************************/

app.get('/login', Auth0.login);
app.get('/callback', Auth0.authVerify, user.storeIfNew, user.updateIfAdmin, Auth0.success);
app.get('/logout', Auth0.logout);
app.get('/retrieveUserData', user.retrieveData);

/********************/
/**** Cloudinary ****/
/********************/

app.post('/cloudinarySend', cloud.post);
app.post('/studentUpload', cloud.upload);

/***********************************/
/**** Kairos Facial Recognition ****/
/***********************************/

app.post('/kairosGalleryStore', kairos.storeInGallery);
app.post('/kairosGalleryRecognize', kairos.recognize);

/******************/
/**** Database ****/
/******************/

app.get('/search', search.searchDB);

/******************/
/**** Wildcard ****/
/******************/

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/dist/index.html'));
});

module.exports = app;