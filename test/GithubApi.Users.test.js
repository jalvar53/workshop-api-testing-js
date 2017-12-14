const {
  agent,
  expect,
  responseTime,
  APIBaseUrl
} = require('../test-config/test-config');

describe('Given the Github API', () => {
  describe('When we request for all the users', () => {
    let usersQuery;
    let requestTime;

    before(() => {
      usersQuery = agent.get(`${APIBaseUrl}/users`)
        .use(responseTime((req, time) => {
          requestTime = time;
        }))
        .auth('token', process.env.ACCESS_TOKEN)
        .then(() => null);
      return usersQuery;
    });

    it('Then, should take less than 5 seconds', () => {
      expect(requestTime).to.be.lessThan(5000);
    });
  });
});
