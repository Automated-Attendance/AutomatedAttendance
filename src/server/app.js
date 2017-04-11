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
import studentHelpers from './db/studentHelpers.js';
import classHelpers from './db/classHelpers.js';
import fileUpload from 'express-fileupload';
import user from './db/userHelpers';
import twilio from './twilio/twilioHelper';
import mailGun from './mailgun/mailGunHelpers';


const api_key = process.env.MAILGUN_API_KEY;
  const domain = process.env.MAILGUN_DOMAIN;
  const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});


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
app.post('/studentUpload', cloud.upload, studentHelpers.addStudent);

/***********************************/
/**** Kairos Facial Recognition ****/
/***********************************/

app.post('/kairosGalleryStore', kairos.storeInGallery);
app.post('/kairosGalleryRecognize', kairos.recognize);

/******************/
/**** Database ****/
/******************/

app.post('/getStudentData', search.querySelector, search.queryDatabase);
app.get('/getClassData', classHelpers.getClass);
app.post('/addClass', classHelpers.addClass)

/*****************/
/**** Twillio ****/
/*****************/

app.post('/twilioMessage', twilio.twilioMessage);

/*****************/
/**** MailGun ****/
/*****************/

app.post('/emailMessage', function (req, res) {
  // const api_key = process.env.MAILGUN_API_KEY;
  // const domain = process.env.MAILGUN_DOMAIN;
  // const mailgun = require('maingun-js')({apiKey: api_key, domain: domain});
   
  var data = {
    from: 'Excited User <aaallstars15@gmail.com>',
    to: 'hanshengzhao1993@gmail.com',
    subject: 'Hello Again',
    text: 'Testing some emails again'
  };
   
  mailgun.messages().send(data, function (error, body) {
    if(error){
      console.log(error)
    } else {
      console.log(body);
    }
  });
})

/******************/
/**** Wildcard ****/
/******************/

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/dist/index.html'));
});

module.exports = app;