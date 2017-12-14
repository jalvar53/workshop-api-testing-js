const {
  agent,
  expect,
  APIBaseUrl,
  listPublicEventsSchema
} = require('../test-config/test-config');

describe('Given event Github API resources', () => {
  describe('When wanna verify the List public events', () => {
    let listPublicEventsQuery;

    before(() => {
      listPublicEventsQuery = agent
        .get(`${APIBaseUrl}/events`)
        .auth('token', process.env.ACCESS_TOKEN);
    });

    it('then the body should have a schema', () =>
      listPublicEventsQuery.then((response) => {
        console.log(response.body);
        expect(response.body).to.be.jsonSchema(listPublicEventsSchema);
      }));
  });
});
