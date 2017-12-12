'use strict';
const routes = [
  require('./xml'),
]

module.exports = require('express').Router().use(routes);
