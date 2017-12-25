const expect = require('chai').expect;
require('dotenv').config();
const request = require('supertest'); //used for testing http
const app = require('../server/app.js');
const port = process.env.PORT || 8080;

describe('Airbnb Listing Test Spec', () => {
  let server;
  beforeEach((done) => {
    server = app.listen(port, done); //require('../server/app.js');
    //should put after each outside of before each
    afterEach(() => {
      server.close();
    });
  });

  describe('Server Routing:', () => {
    it('should get 200 response with /listings endpoint', (done) => {
      request(app)
        .get('/listings')
        .expect(200, done);
    });
  });

  describe('Queues:', () => {
    it('should have messages in the listings response queue after handling messages from listings queue', (done) => {
      // request(app)
      //   .get('/listings')
      //   .expect(200, done);
    });
  });
});