import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const should = chai.should();

const apiVersion = '/api/v1';

chai.use(chaiHttp);

// ////////////////////
// Test for parcels //
// ////////////////////

// get all parcel delivery orders
describe('## /GET parcels', () => {
  it('should GET all the parcels', (done) => {
    chai.request(app)
      .get(`${apiVersion}/parcels`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

// test create parcel routes
describe('## /POST create new parcel delivery order', () => {
  it('should POST a new parcel', (done) => {
    chai.request(app)
      .post(`${apiVersion}/parcels`)
      .send({})
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

// signUp the user when no data are sent
describe('/POST signUp user', () => {
  const signUpData = {
    firstName: '',
    lastName: '',
    email: '',
    passwrord: '',
  };
  it('should POST user data (signUp)', (done) => {
    chai.request(app)
      .post(`${apiVersion}/user/signUp`)
      .send(signUpData)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

describe('/GET /:userId/parcels', () => {
  it('should Get parcel delivery order by a specific user', (done) => {
    chai.request(app)
      .get(`${apiVersion}/user/:userId/parcels`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

// post admin data
describe('/POST signIn admin', () => {
  it('should POST admin data (signIn)', (done) => {
    chai.request(app)
      .post(`${apiVersion}/admin/signIn`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
