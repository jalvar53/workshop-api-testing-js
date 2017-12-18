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

  describe('When we call the endpoint of all users', () => {
    it('Then, should have 30 (default) registers', () => {
      agent.get(`${APIBaseUrl}/users`)
        .auth('token', process.env.ACCESS_TOKEN)
        .then((response) => {
          expect(response.body.length).to.be.equal(30);
        });
    });

    it('Then, should have 10 registers', () => {
      agent.get(`${APIBaseUrl}/users`)
        .auth('token', process.env.ACCESS_TOKEN)
        .query({ per_page: 10 })
        .then((response) => {
          expect(response.body.length).to.be.equal(10);
        });
    });

    it('Then, should have 50 registers', () => {
      agent.get(`${APIBaseUrl}/users`)
        .auth('token', process.env.ACCESS_TOKEN)
        .query({ per_page: 50 })
        .then((response) => {
          expect(response.body.length).to.be.equal(50);
        });
    });
  });
});
