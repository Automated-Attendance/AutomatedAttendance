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
import insert from './db/insert.js';
import studentHelpers from './db/studentHelpers.js';
import classHelpers from './db/classHelpers.js';
import fileUpload from 'express-fileupload';
import user from './db/userHelpers';
import twilio from './twilio/twilioHelper';
import mailGun from './mailgun/mailGunHelpers';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
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
app.post('/studentUpload', cloud.upload, studentHelpers.addStudent, kairos.storeInGallery);

/***********************************/
/**** Kairos Facial Recognition ****/
/***********************************/

app.get('/galleryLists', kairos.test);
app.get('/galleryRemove/:galleryName', kairos.testGalleryRemove);
app.get('/usersInGallery/:galleryName', kairos.testGalleryList);
app.post('/kairosGalleryRecognize', kairos.recognize, search.getSpecificUser, mailGun.sendMailForArrival);

/******************/
/**** Database ****/
/******************/

app.post('/getStudentData', search.querySelector, search.queryDatabase);
app.get('/getClassData', classHelpers.getClass);
app.post('/addClass', classHelpers.addClass);
app.post('/getStudentWithCertainClasses', search.getListOfUsersWithCertainClasses, insert.insertAttendanceRecord );

/*****************/
/**** Twillio ****/
/*****************/

app.post('/twilioMessage', twilio.twilioMessage);

/*****************/
/**** MailGun ****/
/*****************/

app.post('/emailStudents', search.getListOfUsers, mailGun.sendMailLate);

/******************/
/**** Wildcard ****/
/******************/

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/dist/index.html'));
});

module.exports = app;