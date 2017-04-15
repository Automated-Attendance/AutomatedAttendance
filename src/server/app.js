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
import search from './db/search';
import studentHelpers from './db/ModelHelpers/studentHelpers';
import classHelpers from './db/ModelHelpers/classHelpers';
import fileUpload from 'express-fileupload';
import User from './db/ModelHelpers/userHelpers';
import twilio from './twilio/twilioHelper';
import mailGun from './mailgun/mailGunHelpers';
import Attendance from './db/ModelHelpers/attendanceHelpers';



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
app.get('/callback', Auth0.authVerify, User.storeAndLogin);
app.get('/logout', Auth0.logout);
app.get('/retrieveUserData', User.retrieveData);

/********************/
/**** Cloudinary ****/
/********************/

// rip

/***********************************/
/**** Kairos Facial Recognition ****/
/***********************************/

app.get('/galleryLists', kairos.test);
app.get('/galleryRemove/:galleryName', kairos.testGalleryRemove);
app.get('/usersInGallery/:galleryName', kairos.testGalleryList);
app.post('/kairosGalleryRecognize', studentHelpers.checkInStudents);

/******************/
/**** Database ****/
/******************/

// Students
app.post('/studentUpload', studentHelpers.addToClass);
app.post('/removeStudent', studentHelpers.removeFromClass);

// Classes
app.get('/classList', classHelpers.getClass);
app.post('/addClass', classHelpers.addClass);
app.post('/removeClass', classHelpers.removeClass);

// Attendance
app.get('/attendanceRecords', Attendance.getRecords);
app.post('/storeAttendanceRecord', Attendance.storeRecords);
app.post('/emailLateStudents', Attendance.emailLateStudents);

// idk yet
app.get('/allUsers', search.getAllUsernames);

/*****************/
/**** Twillio ****/
/*****************/

app.post('/twilioMessage', twilio.twilioMessage);

/*****************/
/**** MailGun ****/
/*****************/

app.post('/emailStudentsWarning', search.getListOfUsers, mailGun.sendMailLate);

/******************/
/**** Wildcard ****/
/******************/

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/dist/index.html'));
});

module.exports = app;