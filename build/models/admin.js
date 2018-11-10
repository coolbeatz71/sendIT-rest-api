'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var adminFilePath = _path2.default.resolve(__dirname, '../../files/admin.json');
var parcelFilePath = _path2.default.resolve(__dirname, '../../files/parcels.json');

var Admin = function () {
  function Admin(email, password) {
    _classCallCheck(this, Admin);

    var app = new _app2.default();
    this.app = app;

    this.email = email;
    this.password = password;
  }

  /**
   * get adminInfo by email and password [signIn]
   *
   * @param  string email
   * @param  string password
   * @return object
   */


  _createClass(Admin, [{
    key: 'getAdmin',
    value: function getAdmin(email, password) {
      var _this = this;

      this.email = email;
      this.password = password;

      var adminData = this.app.readDataFile(adminFilePath);

      adminData.forEach(function (item) {
        if (item.email === _this.email && item.password === _this.password) {
          _this.adminInfo = item;
        }
      });

      return this.adminInfo;
    }

    /**
     * get the admin Id using his email
     *
     * @param  string email
     * @return string
     */

  }, {
    key: 'getAdminIdByEmail',
    value: function getAdminIdByEmail(email) {
      var _this2 = this;

      this.email = email;
      var myId = void 0;
      var adminData = this.app.readDataFile(adminFilePath);

      adminData.forEach(function (item) {
        if (item.email === _this2.email) {
          myId = item.id;
        }
      });

      return myId;
    }

    /**
     * check whether the admin token is valid or not
     *
     * @param  string  authKey
     * @return boolean
     */

  }, {
    key: 'isTokenValid',
    value: function isTokenValid(authKey) {
      var userData = this.app.readDataFile(adminFilePath);
      var user = userData.find(function (item) {
        return item.token === authKey;
      });

      return !!user;
    }

    /**
     * get admin Id using the token (authKey)
     *
     * @param  string authKey
     * @return object || false
     */

  }, {
    key: 'getAdminIdByToken',
    value: function getAdminIdByToken(authKey) {
      var userData = this.app.readDataFile(adminFilePath);
      var user = userData.find(function (item) {
        return item.token === authKey;
      });

      return user ? user.id : false;
    }

    /**
     * edit presentLocation or status for a delivery order
     * @param  string userId
     * @param  string parcelId
     * @param  object params
     * @return {[type]}
     */

  }, {
    key: 'editparcel',
    value: function editparcel(userId, parcelId) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      // get presentLocation and status
      var presentLocation = params.presentLocation,
          status = params.status;

      // read parcel json file

      var parcelData = this.app.readDataFile(parcelFilePath);

      var parcel = parcelData.find(function (el) {
        return el.orderId === parcelId && el.sender.id === userId;
      });

      if (!parcel || parcel.status === 'delivered') {
        return false;
      }

      // edit its presentLocation or status
      parcel.presentLocation = presentLocation;
      parcel.status = status;

      this.app.writeDataFile(parcelFilePath, parcelData);
      return parcel;
    }
  }]);

  return Admin;
}();

exports.default = Admin;