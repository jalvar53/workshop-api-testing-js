const agent = require('superagent-promise')(require('superagent'), Promise);
const { expect } = require('chai');

const username = 'jalvar53';
describe('Given a Github HTTP API', () => {
  describe('When testing POST and PATCH Http Methods', () => {
    describe('And we get the logged user repos', () => {
      let repo;

      before(() => {
        const repoQuery = agent.get(`https://api.github.com/users/${username}/repos`)
          .auth('token', process.env.ACCESS_TOKEN)
          .then((response) => {
            const repositories = response.body;
            repo = repositories.find(repository => repository.private === false);
          });
        return repoQuery;
      });

      it('Then, the user should have at least one public repo', () => {
        expect(repo).to.haveOwnProperty('name');
      });

      describe('Given a username and a repository name', () => {
        let issueNumber;
        const issueTitle = {
          title: 'Testing API'
        };
        describe('When we make a POST request to create a new issue', () => {
          it('Then, the pull request should be created with only the title', () => {
            const issueSearch = agent.post(`https://api.github.com/repos/${username}/${repo.name}/issues`, issueTitle)
              .auth('token', process.env.ACCESS_TOKEN)
              .then((response) => {
                issueNumber = response.body.number;
                expect(response.body.body).to.equal(null);
                expect(response.body.title).to.equal(issueTitle.title);
              });
            return issueSearch;
          });
        });

        describe('When we make a PATCH request to add a body to a created issue', () => {
          const issueBody = {
            body: 'Testing the API, I\'m the issue body!'
          };

          it('Then, should return a response with non-empty body', () => {
            agent.patch(`https://api.github.com/repos/${username}/${repo.name}/issues/${issueNumber}`, issueBody)
              .auth('token', process.env.ACCESS_TOKEN)
              .then((response) => {
                expect(response.body.title).to.equal(issueTitle.title);
                expect(response.body.body).to.equal(issueBody.body);
              });
          });
        });
      });
    });
  });
});
