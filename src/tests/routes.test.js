/* eslint-disable */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const should = chai.should();
const { expect, assert } = chai;

const apiVersion = '/api/v1';

chai.use(chaiHttp);

// //////////////////////////
// Test for parcels routes //
// //////////////////////////

describe('## /GET parcels without Authorization header', () => {
  it('should GET all the parcels', (done) => {
    chai.request(app)
      .get(`${apiVersion}/parcels`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

// get all parcel delivery orders
describe('## /GET parcels with Authorization header', () => {
  it('should GET all the parcels', (done) => {
    chai.request(app)
      .get(`${apiVersion}/parcels`)
      .set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

// test create parcel routes
describe('## /POST create new parcel delivery order without Authorization header', () => {
  it('should POST a new parcel', (done) => {
    chai.request(app)
      .post(`${apiVersion}/parcels`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

// to fetch a specific delivery order by its ID
describe('## /GET parcels/:orderId', () => {
  const orderId = '001';
  it('should GET a specific delivery order by its ID', (done) => {
    chai.request(app)
      .get(`${apiVersion}/parcels/${orderId}`)
      .set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

// for editing the destination of a parcel
describe('## /PUT parcels/:parcelId/destination without Authorization header', () => {
  const parcelId = '001'; 
  it('should edit the destination of a parcel', (done) => {
    chai.request(app)
      .put(`${apiVersion}/parcels/${parcelId}/destination`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

// for cancelling a parcel delivery order
describe('## /PUT parcels/:parcelId/cancel without Authorization header', () => {
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
describe('/POST signUp user with empty argument', () => {
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

describe('/POST signUp user, Email already exist', () => {
  const signUpData = {
    firstName: 'whatever',
    lastName: 'whatever',
    email: 'sigmacool@gmail.com',
    passwrord: '12345678',
  };
  it('should POST user data (signUp)', (done) => {
    chai.request(app)
      .post(`${apiVersion}/user/signUp`)
      .send(signUpData)
      .end((err, res) => {
        res.should.have.status(401);
        expect(res).to.be.json;
        done();
      });
  });
});

// signIn the user when no data are sent
describe('/POST signIn user with empty params', () => {
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

describe('/POST signIn user with good params', () => {
  it('should POST user data (signIn)', (done) => {
    chai.request(app)
      .post(`${apiVersion}/user/signIn`)
      .send({
        email: 'sigmacool@gmail.com',
        password: '12345678'
      })
      .end((err, res) => {
        res.should.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
});

// fetch all parcel delivery order by an user
describe('/GET /:userId/parcels', () => {
  const userId = '001';
  it('should fetch all parcel delivery order by an user', (done) => {
    chai.request(app)
      .get(`${apiVersion}/user/${userId}/parcels`)
      .set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

// get the number for parcel delivery order per category
describe('/GET /parcels/count with Authorization header', () => {
  it('should get the number for parcel delivery order per category', (done) => {
    chai.request(app)
      .get(`${apiVersion}/user/parcels/count`)
      .set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});


// //////////////////////////
// Test for admin route    //
// //////////////////////////

// post admin data
describe('/POST signIn admin without params', () => {
  it('should POST admin data (signIn)', (done) => {
    chai.request(app)
      .post(`${apiVersion}/admin/signIn`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

describe('/POST signIn admin with Good params', () => {
  it('should POST admin data (signIn)', (done) => {
    chai.request(app)
      .post(`${apiVersion}/admin/signIn`)
      .send({
        email: 'admin@gmail.com',
        password: '12345678'
      })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

// admin edit parcel presentlocation and status
describe('/PUT admin/parcels/:parcelId/edit without body request and no Auth header', () => {
  it('should edit presentLocation and status of a parcel delivery order: return 401', (done) => {
    const parcelId = '001';
    chai.request(app)
      .put(`${apiVersion}/admin/parcels/${parcelId}/edit`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

// get the number for parcel delivery order per category
describe('/GET /parcels/count without Authorization header', () => {
  it('should get the number for parcel delivery order per category for All user', (done) => {
    chai.request(app)
      .get(`${apiVersion}/admin/parcels/count`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});
