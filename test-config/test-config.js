const agent = require('superagent-promise')(require('superagent'), Promise);
const responseTime = require('superagent-response-time');
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const { listPublicEventsSchema } = require('../schema/ListPublicEvents.schema');
const statusCode = require('http-status-codes');
const md5 = require('md5');
const chaiSubset = require('chai-subset');
const APIBaseUrl = 'https://api.github.com';
const isomorphic = require('isomorphic-fetch');
chai.use(chaiSubset);
chai.use(require('chai-json-schema'));

module.exports = {
  agent,
  assert,
  expect,
  isomorphic,
  statusCode,
  md5,
  APIBaseUrl,
  responseTime,
  listPublicEventsSchema
};
