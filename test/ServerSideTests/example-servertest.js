import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../src/server/app';
import db from '../../src/server/db/index';

// for stubbing requests
chai.use(chaiHttp);

describe('a sample server test', () => {

  after(() => {
    setTimeout(() => {
      db.connection.end();
    }, 1000);
  });

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