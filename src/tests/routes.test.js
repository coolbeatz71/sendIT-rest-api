import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const should = chai.should();

const apiVersion = '/api/v1';

chai.use(chaiHttp);

describe('/GET parcels', () => {
  it('it should GET all the parcels', (done) => {
    chai.request(app)
      .get(`${apiVersion}/parcels`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
