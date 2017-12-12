const expect = require('chai').expect;
require('dotenv').config();
const request = require('supertest'); //used for testing http
const app = require('../server/app.js');

describe('Shiftly Backend Test Spec', () => {
  let server;
  beforeEach((done) => {
    server = app.listen(port, done);
  });

  afterEach(() => {
    server.close();
  });
  describe('Server Routing:', () => {
    it('should get 200 response with /listings endpoint', (done) => {
      request(app)
        .get('/listings')
        .expect(200, done);
    });
  });
});