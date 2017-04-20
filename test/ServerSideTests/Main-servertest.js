import mysql from 'mysql';
import request from 'request';
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../../src/server/app';
import makeTables from '../../src/server/db/config';
import Promise from 'bluebird';
import AuthQueries from '../../src/server/db/QuerySelectors/AuthQueries';


// Queries for tests
const AuthQuery = new AuthQueries();

// for stubbing requests
chai.use(chaiHttp);

describe('', function() {
  let db, server, port = 4568;

  beforeEach(async () => {
    let dbName = 'automatedattendance';
    let connection = mysql.createConnection({
      user: 'root',
      password: '',
    });

    db = Promise.promisifyAll(connection, { multiArgs: true });
    await db.connectAsync();
    await db.queryAsync('DROP DATABASE IF EXISTS ' + dbName);
    await db.queryAsync('CREATE DATABASE IF NOT EXISTS ' + dbName);
    console.log('Connected to ' + dbName + 'database as ID ' + db.threadId);
    await db.queryAsync('USE ' + dbName);
    await makeTables(db);
    server = app.listen(port);

    afterEach(() => {
      server.close();
    });

    after(() => db.end());
  });





  describe('Starter Tests', () => {

    it('should 404 for unknown routes', (done) => {
      chai.request(server)
        .get('/testingroute')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });

    it('have a database', async () => {
      let [result] = await db.queryAsync(`SELECT * FROM users`);
      expect(result).to.exist;
    });
  });





  describe('Auth0 Helpers', () => {

    it('should logout', (done) => {
      chai.request(server)
        .get('/logout')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });

  });





  describe('Student Routes', () => {

    // it('/studentUpload should return 201 when using mock data', async () => {
    //   const fakeStudentData = require('../FakeData/FakeStudentUploadData');
    //   await db.queryAsync(`INSERT INTO users (user_name, first_name, last_name, email) 
    //     VALUES ('Jukejc', 'Jason', 'Chambers', 'jas.o.chambers@gmail.com');`);
    //   const response = await chai.request(server).post('/studentUpload').send(fakeStudentData);
    //   const [user] = await db.queryAsync(AuthQuery.selectExistingUser('jas.o.chambers@gmail.com'));
    //   expect(response).to.have.status(201);
    // });

    ///// TODO: Remove student route

  });





  describe('Attendance Helpers', () => {

    it('/storeAttendanceRecord should return 201 when using mock data', async () => {
      const mockRequestBody = JSON.parse('{"classes":["HRSF72", "HRSF76"],"time":"2017-04-20T01:30:00.000Z"}');
      const response = await chai.request(server).post('/storeAttendanceRecord').send(mockRequestBody);
      expect(response).to.have.status(201);
    });

    it('/attendanceRecords should return all attendance', async () => {
      const response = await chai.request(server).get(`/attendanceRecords?type=${'allAttendance'}&email=${undefined}`);
      expect(response).to.have.status(200);
    });

    it('/attendanceRecords should return students attendance', async () => {
      const response = await chai.request(server).get(`/attendanceRecords?type=${'studentAttendance'}&email=${'jas.o.chambers@gmail.com'}`);
      expect(response).to.have.status(200);
    });

    it('/emailLateStudents should email late students', async () => {
      const mockRequestBody = JSON.parse('{"classes":["HRSF72", "HRSF76"],"time":"2017-04-20T01:30:00.000Z"}');
      const populateRecords = await chai.request(server).post('/storeAttendanceRecord').send(mockRequestBody);
      expect(populateRecords).to.have.status(201);
      const response = await chai.request(server).post('/emailLateStudents');
      expect(response).to.have.status(200);
    });

    it('/getAttendanceRecordDate remove attendance records from current day', async () => {
      const mockRequestBody = JSON.parse('{"classes":["HRSF72", "HRSF76"]}');
      mockRequestBody.time = new Date();
      const populateRecords = await chai.request(server).post('/storeAttendanceRecord').send(mockRequestBody);
      expect(populateRecords).to.have.status(201);
      const response = await chai.request(server).get(`/getAttendanceRecordDate?date=${new Date()}`);
      expect(response).to.have.status(202);
    });

    it('/changeAttendanceStatus should update a students status from attendance table', async () => {
      const mockRequestBody = JSON.parse('{"classes":["HRSF72", "HRSF76"]}');
      mockRequestBody.time = new Date();
      const populateRecords = await chai.request(server).post('/storeAttendanceRecord').send(mockRequestBody);
      expect(populateRecords).to.have.status(201);
      let updateData = { 
        data: { 
          selectedDate: '2017-04-20 03:23:00',
          selectedStudent: { label: 'Jason Chambers - Jukejc', value: 'Jukejc' },
          selectedStatus: 'Tardy' 
        }
      };
      const response = await chai.request(server).post('/changeAttendanceStatus').send(updateData);
      expect(response).to.have.status(201);
    });
  });




  describe('Class Helpers', () => {

    it('/classList should get list of classes', async () => {
      const response = await chai.request(server).get('/classList');
      expect(response).to.have.status(200);
    });

    it('/getEnrollment should get list of enrollments', async () => {
      const response = await chai.request(server).get('/getEnrollment');
      expect(response).to.have.status(200);
    });

    it('/addClass should not add not add a class that already exists', async () => {
      const response = await chai.request(server).post('/addClass').send({className: 'HRSF72'});
      expect(response).to.have.status(204);
    });

    it('/addClass should add class if it doesnt exist in database', async () => {
      const response = await chai.request(server).post('/addClass').send({className: 'Muahahah'});
      expect(response).to.have.status(201);
    });

  })

});