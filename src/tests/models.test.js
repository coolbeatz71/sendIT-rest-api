import chai from 'chai';
import Parcel from '../models/parcel';
import User from '../models/user';
import Admin from '../models/admin';

const should = chai.should();
const { expect, assert } = chai;

const user = new User();
const parcel = new Parcel();
const admin = new Admin();

// //////////////////////////////////
// Testing models concerning user //
// //////////////////////////////////
describe('##### User class', () => {
  // Testing user creation
  describe('#### Testing user account creation', () => {
    describe('# when email already exist', () => {
      it('should return false', () => {
        const firstName = 'whatever';
        const lastName = 'whatever';
        const email = 'sigmacool@gmail.com';
        const password = 'whatever';

        const createUser = user.createUser(firstName, lastName, email, password);
        expect(createUser).to.be.false;
      });
    });
  });

  // Testing getUser
  describe('#### Testing get user methods', () => {
    describe('# When email and password dont exist', () => {
      const email = 'whatever';
      const password = 'whatever';

      it('should return undefined', () => {
        const getUser = user.getUser(email, password);
        expect(getUser).to.be.an('undefined');
      });
    });

    describe('# When email and password exist', () => {
      const email = 'sigmacool@gmail.com';
      const password = '12345678';

      it('should return object', () => {
        const getUser = user.getUser(email, password);
        expect(getUser).to.be.an('object');
      });
    });
  });

  // Testing getUserIdByEmail
  describe('#### Testing get userId by email methods', () => {
    describe('# When the email dont exist', () => {
      const email = 'whatever';

      it('should return undefined', () => {
        const getId = user.getUserIdByEmail(email);
        expect(getId).to.be.an('undefined');
      });
    });

    describe('# When the email exist', () => {
      const email = 'sigmacool@gmail.com';

      it('should return a string', () => {
        const getId = user.getUserIdByEmail(email);
        expect(getId).to.be.a('string');
      });
    });
  });

  describe('#### Testing IsTokenValid method', () => {
    it('should return boolean', () => {
      const isTokenValid = user.isTokenValid('whatever');
      assert.isBoolean(isTokenValid);
    });
  });

  describe('#### Testing getUserIdByToken method', () => {
    it('should return some value', () => {
      const isTokenValid = user.getUserIdByToken('authkey');
      assert.isNotNull(isTokenValid);
    });
  });

  describe('#### Testing getEncryptedToken method', () => {
    it('should return a string', () => {
      const encryptedToken = user.getEncryptedToken('myEmail');
      expect(encryptedToken).to.be.a('string');
    });
  });
});

// ////////////////////////////////////
// Testing models concerning Parcel //
// ////////////////////////////////////
describe('##### Parcel class', () => {
  // Testing get all parcels
  describe('# get all parcel delivery order', () => {
    it('should return an array', () => {
      const allParcel = parcel.getAllParcel();
      assert.isArray(allParcel);
    });
  });

  // Testing get all parcels for a specific user
  describe('# get all for parcel delivery order for a specific user', () => {
    it('should return an array', () => {
      const allParcel = parcel.getAllParcelByUser('011');
      assert.isNull(allParcel);
    });
  });

  // Testing get parcel order price
  describe('# get price for a parcel by its weight', () => {
    it('should return a number', () => {
      const price = parcel.getParcelPrice('500');
      assert.isNumber(price);
    });
  });
});

// ////////////////////////////////////
// Testing models concerning Admin  //
// ////////////////////////////////////
describe('##### Admin class', () => {
  // Testing get admin
  describe('# When email and password dont exist', () => {
    const email = 'whatever';
    const password = 'whatever';

    it('should return undefined', () => {
      const getAdmin = admin.getAdmin(email, password);
      expect(getAdmin).to.be.an('undefined');
    });
  });

  // Testing get admin id by email
  describe('# get admin Id by email', () => {
    const email = 'whatever';

    it('should return undefined', () => {
      const getAdmin = admin.getAdminIdByEmail(email);
      expect(getAdmin).to.be.an('undefined');
    });
  });

  describe('# Testing IsTokenValid method', () => {
    it('should return boolean', () => {
      const isTokenValid = admin.isTokenValid('whatever');
      assert.isBoolean(isTokenValid);
    });
  });

  describe('# Testing getAdminIdByToken method', () => {
    it('should return some value', () => {
      const isTokenValid = admin.getAdminIdByToken('authkey');
      assert.isNotNull(isTokenValid);
    });
  });
});
