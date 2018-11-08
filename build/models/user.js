'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var userFilePath = _path2.default.resolve(__dirname, '../../files/users.json');

var User = function () {
  function User(firstName, lastName, email, password) {
    _classCallCheck(this, User);

    var app = new _app2.default();
    this.app = app;

    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }

  /**
   * create a user in the server [signUp]
   *
   * @param  string firstName
   * @param  string lastName
   * @param  string email
   * @param  string password
   * @return object
   */


  _createClass(User, [{
    key: 'createUser',
    value: function createUser(firstName, lastName, email, password) {
      this.setUserId();
      var id = this.getUserId();
      var response = void 0;
      var userInfo = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      };

      var userData = this.app.readDataFile(userFilePath);

      var isUserExist = userData.find(function (item) {
        return item.email === email;
      });

      if (isUserExist) {
        response = false;
      } else {
        // push new user
        userData.push(userInfo);
        this.app.writeDataFile(userFilePath, userData);
        response = userInfo;
      }
      return response;
    }

    /**
     * get userInfo by email and password [signIn]
     *
     * @param  string email
     * @param  string password
     * @return object
     */

  }, {
    key: 'getUser',
    value: function getUser(email, password) {
      var _this = this;

      this.email = email;
      this.password = password;

      var userData = this.app.readDataFile(userFilePath);

      userData.forEach(function (item) {
        if (item.email === _this.email && item.password === _this.password) {
          _this.userInfo = item;
        }
      });

      return this.userInfo;
    }

    /**
     * get userId by his email
     * @param  string email
     * @return string
     */

  }, {
    key: 'getUserIdByEmail',
    value: function getUserIdByEmail(email) {
      var _this2 = this;

      this.email = email;
      var myId = void 0;
      var userData = this.app.readDataFile(userFilePath);

      userData.forEach(function (item) {
        if (item.email === _this2.email) {
          myId = item.id;
        }
      });

      return myId;
    }

    /**
     * set the userId
     */

  }, {
    key: 'setUserId',
    value: function setUserId() {
      this.userId = String(Math.random()).substr(2, 3);
    }

    /**
     * get the userId
     * @return string
     */

  }, {
    key: 'getUserId',
    value: function getUserId() {
      return this.userId;
    }
  }]);

  return User;
}();

exports.default = User;