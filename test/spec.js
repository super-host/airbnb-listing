const expect = require('chai').expect;
require('dotenv').config();
const request = require('supertest'); //used for testing http
const app = require('../server/app.js');

describe('Shiftly Backend Test Spec', () => {
  describe('Server Routing:', () => {
    it('should get 200 response with /listings endpoint', (done) => {
      request(app)
        .get('/listings')
        .expect(200, done);
    });
  });
});