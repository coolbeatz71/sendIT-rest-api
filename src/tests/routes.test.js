import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const should = chai.should();

const apiVersion = '/api/v1';

chai.use(chaiHttp);

// get all parcel delivery orders
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

// signUp the user when no data are sent
describe('/POST signUp user', () => {
  const signUpData = {
    firstName: '',
    lastName: '',
    email: '',
    passwrord: '',
  };
  it('it should POST user data (signUp)', (done) => {
    chai.request(app)
      .post(`${apiVersion}/user/signUp`)
      .send(signUpData)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

// post admin data
describe('/POST signIn admin', () => {
  it('it should POST admin data (signIn)', (done) => {
    chai.request(app)
      .post(`${apiVersion}/admin/signIn`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
