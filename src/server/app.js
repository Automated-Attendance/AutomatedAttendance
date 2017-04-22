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
import kairos from './kairosFR/kairosHelpers';
import searchHelpers from './db/ModelHelpers/searchHelpers';
import studentHelpers from './db/ModelHelpers/studentHelpers';
import classHelpers from './db/ModelHelpers/classHelpers';
import userHelpers from './db/ModelHelpers/userHelpers';
import mailgunHelpers from './mailgun/mailGunHelpers';
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

/************************/
/**** Authentication ****/
/************************/

app.get('/login', Auth0.login);
app.get('/callback', Auth0.authVerify, userHelpers.storeAndLogin);
app.get('/logout', Auth0.logout);
app.get('/retrieveUserData', userHelpers.retrieveData);

/********************/
/**** Cloudinary ****/
/********************/

// rip

/***********************************/
/**** Kairos Facial Recognition ****/
/***********************************/

app.get('/usersInGallery/:galleryName', kairos.testGalleryList);
app.post('/kairosGalleryRecognize', studentHelpers.checkInStudents);

/******************/
/**** Database ****/
/******************/

// Admins

app.post('/changeUserType',studentHelpers.getByUserName)

// Students
app.get('/studentsByClass', studentHelpers.getByClass);
app.post('/studentUpload', studentHelpers.addToClass);
app.post('/removeStudent', studentHelpers.removeFromClass);

// Classes
app.get('/classList', classHelpers.getClass);
app.get('/getEnrollment', classHelpers.getEnrollment);
app.post('/addClass', classHelpers.addClass);
app.post('/removeClass', classHelpers.removeClass);

// Attendance
app.get('/getAttendanceRecordDate', Attendance.removeAttendanceRecordDate);
app.get('/attendanceRecords', Attendance.getRecords);
app.post('/storeAttendanceRecord', Attendance.storeRecords);
app.post('/emailLateStudents', Attendance.emailLateStudents);
app.post('/changeAttendanceStatus', Attendance.changeAttendanceStatus);

// idk yet
app.get('/allUsers', searchHelpers.getAllUsernames);

/*****************/
/**** Twillio ****/
/*****************/

// no more twillio

/*****************/
/**** MailGun ****/
/*****************/

// rip

/******************/
/**** Wildcard ****/
/******************/

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/dist/index.html'));
});

module.exports = app;