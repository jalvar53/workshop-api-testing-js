const {
  agent,
  expect,
  statusCode,
  assert,
  APIBaseUrl
} = require('../test-config/test-config');

describe('Given a Github API', () => {
  let gistUrl;
  const gistData = {
    description: 'Testing Github\'s API',
    public: true,
    files: {
      'test.json': {
        content: 'Tests'
      }
    }
  };
  describe('When we want to create a new gist', () => {
    it('Then, it should be created correctly', () => {
      const gistPostSearch = agent.post(`${APIBaseUrl}/gists`, gistData)
        .auth('token', process.env.ACCESS_TOKEN)
        .then((response) => {
          expect(response.status).to.equal(statusCode.CREATED);
          expect(response.body).to.containSubset(gistData);
          gistUrl = response.body.url;
        });
      return gistPostSearch;
    });
  });

  describe('When we created a gist', () => {
    let gistSearch;

    before(() => {
      gistSearch = agent.get(gistUrl)
        .auth('token', process.env.ACCESS_TOKEN);
    });

    it('Then, should exist in the gists list', () => {
      gistSearch.then((response) => {
        expect(response.status).to.equal(statusCode.OK);
        assert.exists(response.body.id);
      });
    });
  });

  describe('When we want to delete a gist', () => {
    let gistDeleteSearch;

    before(() => {
      gistDeleteSearch = agent.del(gistUrl)
        .auth('token', process.env.ACCESS_TOKEN);
    });

    it('Then, should delete it correctly', () => {
      gistDeleteSearch.then((response) => {
        expect(response.status).to.equal(statusCode.NO_CONTENT);
      });
    });
  });

  describe('When we created a gist and deleted it', () => {
    let nonExistantGistSearch;
    before(() => {
      nonExistantGistSearch = agent.get(gistUrl).auth('token', process.env.ACCESS_TOKEN);
    });
    it('Then, should not exist in the gists list', () => {
      nonExistantGistSearch.catch((response) => {
        expect(response.status).to.equal(statusCode.NOT_FOUND);
      });
    });
  });
});
