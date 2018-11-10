import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const should = chai.should();

const apiVersion = '/api/v1';

chai.use(chaiHttp);

// //////////////////////////
// Test for parcels routes //
// //////////////////////////

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

// to fetch a specific delivery order by its ID
describe('## /GET parcels/:orderId', () => {
  it('should GET a specific delivery order by its ID', (done) => {
    chai.request(app)
      .get(`${apiVersion}/parcels/:orderId`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

// for editing the destination of a parcel
describe('## /PUT parcels/:parcelId/destination', () => {
  it('should edit the destination of a parcel', (done) => {
    chai.request(app)
      .put(`${apiVersion}/parcels/:parcelId/destination`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

// for cancelling a parcel delivery order
describe('## /PUT parcels/:parcelId/cancel', () => {
  it('should cancel a parcel delivery order', (done) => {
    chai.request(app)
      .put(`${apiVersion}/parcels/:parcelId/cancel`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

// ///////////////////////////
// Test for users routes    //
// ///////////////////////////

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

// signIn the user when no data are sent
describe('/POST signIn user', () => {
  const signInData = {
    email: '',
    passwrord: '',
  };
  it('should POST user data (signIn)', (done) => {
    chai.request(app)
      .post(`${apiVersion}/user/signIn`)
      .send(signInData)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

// fetch all parcel delivery order by an user
describe('/GET /:userId/parcels', () => {
  it('should fetch all parcel delivery order by an user', (done) => {
    chai.request(app)
      .get(`${apiVersion}/user/:userId/parcels`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

// //////////////////////////
// Test for admin route    //
// //////////////////////////

// post admin data
describe('/POST signIn admin', () => {
  it('should POST admin data (signIn)', (done) => {
    chai.request(app)
      .post(`${apiVersion}/admin/signIn`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

// admin edit parcel presentlocation and status
describe('/PUT admin/parcels/:parcelId/edit', () => {
  it('should Edit parcel presentLocation and status of a parcel delivery order', (done) => {
    chai.request(app)
      .put(`${apiVersion}/admin/parcels/:parcelId/edit`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});
