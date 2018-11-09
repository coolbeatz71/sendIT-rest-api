'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _parcel = require('../models/parcel');

var _parcel2 = _interopRequireDefault(_parcel);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _admin = require('../models/admin');

var _admin2 = _interopRequireDefault(_admin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var should = _chai2.default.should();
var expect = _chai2.default.expect,
    assert = _chai2.default.assert;


var user = new _user2.default();
var parcel = new _parcel2.default();
var admin = new _admin2.default();

// //////////////////////////////////
// Testing models concerning user //
// //////////////////////////////////
describe('##### User class', function () {
  // Testing user creation
  describe('#### Testing user account creation', function () {
    describe('# when email already exist', function () {
      it('should return false', function () {
        var firstName = 'whatever';
        var lastName = 'whatever';
        var email = 'sigmacool@gmail.com';
        var password = 'whatever';

        var createUser = user.createUser(firstName, lastName, email, password);
        expect(createUser).to.be.false;
      });
    });
  });

  // Testing getUser
  describe('#### Testing get user methods', function () {
    describe('# When email and password dont exist', function () {
      var email = 'whatever';
      var password = 'whatever';

      it('should return undefined', function () {
        var getUser = user.getUser(email, password);
        expect(getUser).to.be.an('undefined');
      });
    });

    describe('# When email and password exist', function () {
      var email = 'sigmacool@gmail.com';
      var password = '12345678';

      it('should return object', function () {
        var getUser = user.getUser(email, password);
        expect(getUser).to.be.an('object');
      });
    });
  });

  // Testing getUserIdByEmail
  describe('#### Testing get userId by email methods', function () {
    describe('# When the email dont exist', function () {
      var email = 'whatever';

      it('should return undefined', function () {
        var getId = user.getUserIdByEmail(email);
        expect(getId).to.be.an('undefined');
      });
    });

    describe('# When the email exist', function () {
      var email = 'sigmacool@gmail.com';

      it('should return a string', function () {
        var getId = user.getUserIdByEmail(email);
        expect(getId).to.be.a('string');
      });
    });
  });

  describe('#### Testing IsTokenValid method', function () {
    it('should return boolean', function () {
      var isTokenValid = user.isTokenValid('whatever');
      assert.isBoolean(isTokenValid);
    });
  });

  describe('#### Testing getUserIdByToken method', function () {
    it('should return some value', function () {
      var isTokenValid = user.getUserIdByToken('authkey');
      assert.isNotNull(isTokenValid);
    });
  });

  describe('#### Testing getEncryptedToken method', function () {
    it('should return a string', function () {
      var encryptedToken = user.getEncryptedToken('myEmail');
      expect(encryptedToken).to.be.a('string');
    });
  });
});

// ////////////////////////////////////
// Testing models concerning Parcel //
// ////////////////////////////////////
describe('##### Parcel class', function () {
  // Testing get all parcels
  describe('# get all parcel delivery order', function () {
    it('should return an array', function () {
      var allParcel = parcel.getAllParcel();
      assert.isArray(allParcel);
    });
  });

  // Testing get all parcels for a specific user
  describe('# get all for parcel delivery order for a specific user', function () {
    it('should return an array', function () {
      var allParcel = parcel.getAllParcelByUser('011');
      assert.isArray(allParcel);
    });
  });

  // Testing get parcel order price
  describe('# get price for a parcel by its weight', function () {
    it('should return a number', function () {
      var price = parcel.getParcelPrice('500');
      assert.isNumber(price);
    });
  });
});