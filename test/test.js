/*
 * Global test setup
 */

global.nock = require('nock');

global.chai = require('chai');
global.chai.use(require('chai-as-promised'));
global.expect = global.chai.expect;

global.swapi = require('../lib/swapi');

var record = require('./utils/record');
var recorder = record();

describe('get', function() {

  before( function() {
    recorder.before();
  });

  after( function() {
    recorder.after();
    nock.cleanAll();
  });

  require('./unit/base.js');
  require('./unit/all.js');
  require('./unit/single.js');
  require('./unit/paged.js');
  require('./unit/search.js');
  require('./unit/error.js');

});