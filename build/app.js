'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _parcels = require('./routes/parcels');

var _parcels2 = _interopRequireDefault(_parcels);

var _user = require('./routes/user');

var _user2 = _interopRequireDefault(_user);

var _admin = require('./routes/admin');

var _admin2 = _interopRequireDefault(_admin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var apiVersion = '/api/v1';

// parcels endpoint
app.use(apiVersion + '/parcels', _parcels2.default);

// user endpoint
app.use(apiVersion + '/user', _user2.default);

// admin endpoint
app.use(apiVersion + '/admin', _admin2.default);

module.exports = app;