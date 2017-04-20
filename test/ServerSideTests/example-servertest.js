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
  let db;
  let server;
  const port = 4568;

  const clearDB = async (connection, tablenames, done, count = 0) => {
    try {
      for (table of tablenames) {
        await connection.queryAsync('DROP TABLE IF EXISTS ' + tablename);
        if (++count === tablenames.length) return schema(db).then(done);
      }
    } catch (err) {
      done(err.message);
    }
  };

  beforeEach(function(done) {

    let connection = mysql.createConnection({
      user: 'root',
      password: '',
      database: 'automatedattendance'
    });

    db = Promise.promisifyAll(connection, { multiArgs: true });
    const tablenames = ['users', 'classes', 'attendance_record', 'class_user'];

    db.connect(function(err) {
      if (err) { return done(err); }
      clearDB(db, tablenames, function() {
        server = app.listen(port, done);
      });
    });

    afterEach(() => server.close()); 

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
      let result = await db.queryAsync(`SELECT * FROM users`);
      console.log(result);
      result = await db.queryAsync(`SELECT * FROM users`);
      console.log(result);
      result = await db.queryAsync(`SELECT * FROM users`);
      console.log(result);
      result = await db.queryAsync(`SELECT * FROM users`);
      console.log(result);
    });

  });

});