import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/server/app';
import Schema from '../../src/server/db/config';
import mysql from 'mysql';
import Promise from 'bluebird';

// for stubbing requests
chai.use(chaiHttp);

describe('', () => {

  let db;
  let server;
  let port = 3456;
  const clearDB = async (connection, tablenames, done) => {
    try {
      let count = 0;
      tablenames.forEach(async (tablename) => {
        connection.queryAsync('DROP TABLE IF EXISTS ' + tablename);
        if (++count === tablenames.length) return Schema(db).then(done);
      });
    } catch (err) {
      return done(err.message);
    }
  };



  beforeEach((done) => {
    db = mysql.createConnection({
      host: process.env.CLOUD_TEST_DB_HOST,
      user: process.env.CLOUD_TEST_DB_ADMIN,
      password: process.env.CLOUD_TEST_DB_PASSWORD,
    });

    const tablenames = ['attendance_record', 'users', 'classes', 'class_user'];

    db.connect(function(err) {
      if (err) { return done(err); }
      clearDB(db, tablenames, () => {
        server = app.listen(port, done);
      });
    });

    afterEach(() => server.close());
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

  });

});