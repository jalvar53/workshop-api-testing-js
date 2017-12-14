
const {
  agent,
  expect,
  statusCode,
  md5,
  APIBaseUrl
} = require('../test-config/test-config');

const user = 'aperdomob';
const branchName = 'master';
const repoName = 'jasmine-awesome-report';

describe('Consuming GET Methods', () => {
  let userInformation;

  describe('When getting the user', () => {
    before(() => agent.get(`${APIBaseUrl}/users/${user}`)
      .auth('token', process.env.ACCESS_TOKEN)
      .then((response) => {
        userInformation = response;
      }));

    it('Test GET request for Alejo Perdomo\'s GitHub data', () => {
      expect(userInformation.status).to.equal(statusCode.OK);
      expect(userInformation.body.name).to.equal('Alejandro Perdomo');
      expect(userInformation.body.location).to.equal('Colombia');
      expect(userInformation.body.company).to.equal('PSL');
    });

    describe('When getting all the user repositories', () => {
      let repo;
      let repositories;

      before(() => {
        const repoFound = agent.get(userInformation.body.repos_url)
          .auth('token', process.env.ACCESS_TOKEN)
          .then((response) => {
            repositories = response.body;
            repo = repositories.find(repository => repository.name === `${repoName}`);
          });
        return repoFound;
      });

      it(`Test ${repoName} data through Hypermedia`, () => {
        expect(repo.full_name).to.equal(`${user}/${repoName}`);
        expect(repo.private).to.equal(false);
        expect(repo.description).to.equal('An awesome html report for Jasmine');
      });

      describe('When download the repo as a zip', () => {
        let downloadedFile;

        before(() => {
          const downloadSearch = agent.get(`https://api.github.com/repos/${user}/${repoName}/zipball/${branchName}`)
            .auth('token', process.env.ACCESS_TOKEN)
            .buffer(true)
            .then((file) => {
              downloadedFile = file.text;
            });
          return downloadSearch;
        });

        it('The shasum should match', () => {
          expect(md5(downloadedFile)).to.not.equal('2a7a4a83cb151b7938ee79e558037217');
        });
      });

      describe('When getting the files from the repo', () => {
        const repoContents = {
          name: 'README.md',
          path: 'README.md',
          sha: '9bcf2527fd5cd12ce18e457581319a349f9a56f3'
        };

        it('Should have name, path and', () => agent.get(`https://api.github.com/repos/${user}/${repoName}/readme`)
          .auth('token', process.env.ACCESS_TOKEN)
          .then((response) => {
            expect(response.body).to.containSubset(repoContents);
          }));

        it('Should download the README.md and check its checksum', () => agent.get(`https://raw.githubusercontent.com/${user}/${repoName}/${branchName}/README.md`)
          .auth('token', process.env.ACCESS_TOKEN)
          .buffer(true)
          .then((response) => {
            expect(md5(response.text)).to.equal('5cefc3582f082cd1d9f79b176138e265');
          }));
      });
    });
  });
});
