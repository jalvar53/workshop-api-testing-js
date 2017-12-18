const agent = require('superagent-promise')(require('superagent'), Promise);
const responseTime = require('superagent-response-time');
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const statusCode = require('http-status-codes');
const md5 = require('md5');
const chaiSubset = require('chai-subset');
const APIBaseUrl = 'https://api.github.com';
chai.use(chaiSubset);

module.exports = {
  agent,
  assert,
  expect,
  statusCode,
  md5,
  APIBaseUrl,
  responseTime
  APIBaseUrl
};
