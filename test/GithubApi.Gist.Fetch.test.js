const {
  isomorphic,
  expect,
  assert,
  statusCode,
  APIBaseUrl
} = require('../test-config/test-config');

describe('Given a Github API and isomorphic-fetch library', () => {
  let gist;
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
    let gistPostSearch;
    let responseStatus;

    before(() => {
      gistPostSearch = isomorphic(`${APIBaseUrl}/gists`, {
        method: 'POST',
        body: JSON.stringify(gistData),
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        }
      }).then((response) => {
        responseStatus = response.status;
        return response.json();
      })
        .then((response) => {
          gist = response;
          return response;
        });
      return gistPostSearch;
    });

    it('Then, it should be created correctly', () => {
      gistPostSearch.then(() => {
        expect(responseStatus).to.equal(statusCode.CREATED);
        expect(gist).to.containSubset(gistData);
      });
    });
  });

  describe('When we created a gist', () => {
    let gistSearch;

    before(() => {
      gistSearch = isomorphic(gist.url, {
        method: 'GET',
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        }
      });
    });

    it('Then, should exist in the gists list', () => {
      gistSearch
        .then((response) => {
          expect(response.status).to.equal(statusCode.OK);
          return response.json();
        })
        .then((responseBody) => {
          assert.exists(responseBody);
        });
    });
  });

  describe('When we want to delete a gist', () => {
    let gistDeleteSearch;

    before(() => {
      gistDeleteSearch = isomorphic(gist.url, {
        method: 'DELETE',
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        }
      });
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
      nonExistantGistSearch = isomorphic(gist.url, {
        headers: {
          Authorization: `token ${process.env.ACCESS_TOKEN}`
        }
      });
    });

    it('Then, should not exist in the gists list', () => {
      nonExistantGistSearch.then((response) => {
        expect(response.status).to.equal(statusCode.NOT_FOUND);
      });
    });
  });
});
