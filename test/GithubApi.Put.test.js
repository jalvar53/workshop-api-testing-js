const agent = require('superagent-promise')(require('superagent'), Promise);
const statusCode = require('http-status-codes');
const { expect } = require('chai');

const followerName = 'jalvar53';
const followedName = 'aperdomob';
const baseUrl = 'https://api.github.com';

describe('Put API Tests', () => {
  it('Should return empty body', () => {
    agent.put(`${baseUrl}/user/following/${followedName}`)
      .auth('token', process.env.ACCESS_TOKEN)
      .then((response) => {
        expect(response.status).to.equal(statusCode.NO_CONTENT);
        expect(response.body).to.eql({});
      });
  });

  describe(`Check for ${followerName} in ${followedName} followers list`, () => {
    let user;

    before(() => {
      const userSearch = agent.get(`${baseUrl}/users/${followedName}/followers`)
        .auth('token', process.env.ACCESS_TOKEN)
        .then((response) => {
          const followers = response.body;
          user = followers.find(follower => follower.login === followerName);
        });
      return userSearch;
    });

    it(`${followerName} should be following ${followedName}`, () => {
      expect(user).to.haveOwnProperty('login');
    });
  });

  describe('Check PUT Method\'s idempotency', () => {
    it('Should return empty body', () => {
      agent.put(`${baseUrl}/user/following/${followedName}`)
        .auth('token', process.env.ACCESS_TOKEN)
        .then((response) => {
          expect(response.status).to.equal(statusCode.NO_CONTENT);
          expect(response.body).to.eql({});
        });
    });
  });
});
