import { expect } from 'chai';
import request from 'supertest';
import app from '../../app';
import config from '../../app/config';

describe('Auth API', () => {
  it('should login user successfully', (done) => {
    request(config.AUTH_SERVICE_BASE_URL)
      .post(`/auth`)
      .set('Accept', 'application/json')
      .send({
        username: 'basic-thomas',
        password: 'sR-_pcoow-27-6PAwCD8',
      })
      .end((req, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.have.property('token');
        process.env.BASIC_USER_TOKEN = res.body.token;
        done();
      });
  });
});
