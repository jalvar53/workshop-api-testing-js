const { agent, expect, statusCode } = require('../test-config/test-config');

describe('First Api Tests', () => {
  it('Consume GET Service', () => agent.get('https://httpbin.org/ip').then((response) => {
    expect(response.status).to.equal(statusCode.OK);
    expect(response.body).to.have.property('origin');
  }));

  it('Consume GET Service with query parameters', () => {
    const query = {
      name: 'John',
      age: '31',
      city: 'New York'
    };

    return agent.get('https://httpbin.org/get')
      .query(query)
      .then((response) => {
        expect(response.status).to.equal(statusCode.OK);
        expect(response.body.args).to.eql(query);
      });
  });

  it('Consume POST Service', () => {
    const body = {
      name: 'John',
      age: 31,
      city: 'New York'
    };

    return agent
      .post('https://httpbin.org/post')
      .send(body)
      .then((response) => {
        expect(response.status).to.equal(statusCode.OK);
        expect(response.body.json).to.eql(body);
      });
  });

  it('Consume DELETE Service', () => {
    const body = {
      name: 'John',
      age: 31,
      city: 'New York'
    };

    return agent
      .del('https://httpbin.org/delete')
      .send(body)
      .then((response) => {
        expect(response.status).to.equal(statusCode.OK);
        expect(response.body.json).to.eql(body);
      });
  });

  it('Consume PATCH Service', () => {
    const body = {
      name: 'John',
      age: 32
    };

    return agent
      .patch('https://httpbin.org/patch')
      .send(body)
      .then((response) => {
        expect(response.status).to.equal(statusCode.OK);
        expect(response.body.json).to.eql(body);
      });
  });

  it('Consume PUT Service', () => {
    const body = {
      name: 'Dan',
      age: 27,
      city: 'Miami'
    };

    return agent
      .put('https://httpbin.org/put')
      .send(body)
      .then((response) => {
        expect(response.status).to.equal(statusCode.OK);
        expect(response.body.json).to.eql(body);
      });
  });

  it('Consume HEAD Service with query parameters', () => {
    const body = {
      name: 'John',
      age: 31,
      city: 'Dallas'
    };

    return agent
      .head('https://httpbin.org/headers')
      .query(body)
      .then((response) => {
        expect(response.status).to.equal(statusCode.OK);
        expect(response.body).to.eql({});
      });
  });
});
