const { agent, expect, statusCode } = require('../test-config/test-config');

describe('Given a Github URL that redirects', () => {
  describe('When get the header', () => {
    let redirectSearch;

    before(() => {
      redirectSearch = agent.head('https://github.com/aperdomob/redirect-test')
        .auth('token', process.env.ACCESS_TOKEN);
    });

    it('Then, should have status 301 and contain the correct redirect URL', () => {
      redirectSearch
        .catch((err) => {
          expect(err.status).to.equal(statusCode.MOVED_PERMANENTLY);
          expect(err.response.headers.location).to.equal('https://github.com/aperdomob/new-redirect-test');
        });
    });
  });

  describe('When we get the URL', () => {
    let newUrlSearch;

    before(() => {
      newUrlSearch = agent.get('https://github.com/aperdomob/redirect-test')
        .auth('token', process.env.ACCESS_TOKEN);
    });

    it('Then, should redirect correctly', () => {
      newUrlSearch.then((response) => {
        expect(response.status).to.equal(statusCode.OK);
      });
    });
  });
});
