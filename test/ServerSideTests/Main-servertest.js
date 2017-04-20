import mysql from 'mysql';
import request from 'request';
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../../src/server/app';
import schema from '../../src/server/db/config';
import Promise from 'bluebird';

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
    await schema(db);
    server = app.listen(port);

    afterEach(() => {
      // server.close();
    });

    after(() => db.end());
  });

  describe('dummy test', () => {

    it('should work', (done) => {
      chai.request(server)
        .get('/testingroute')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.text).to.equal('idk man');
          done();
        });
    });

    it('have a database', async () => {
      let [result] = await db.queryAsync(`SELECT * FROM users`);
      expect(result).to.deep.equal([]);
    });

  });

  // describe('Auth0 Helpers', () => {

  //   it('should render login page', (done) => {
  //     chai.request(server)
  //       .get('/login')
  //       .end((err, res) => {
  //         console.log(res);
  //         expect(res.status).to.equal(200);
  //         done();
  //       });
  //   });

  // });

  describe('Cloudinary Helpers', () => {

    it('should upload image to cloudinary', (done) => {
      // chai.request(server)
      //   .get('/login')
      //   .end((err, res) => {
      //     console.log(res);
      //     expect(res.status).to.equal(200);
      //     done();
      //   });
    });

  });

});