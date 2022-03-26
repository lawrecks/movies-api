import { expect } from 'chai';
import request from 'supertest';
import nock from 'nock';
import app from '../../app';
import config from '../../app/config';
import movieMockResponse from '../mocks/movie.mock.json';
import { generateToken } from '../../app/utils/helpers/hash.helpers';

// Generate token for test
let token = '';
generateToken({
  userId: 123,
  name: 'Basic Thomas',
  role: 'basic',
  iss: 'https://www.netguru.com/',
  sub: '123',
}).then((result) => {
  token = result;
});

describe('Movie API', () => {
  describe('Create movie', () => {
    it('should create a movie successfully', (done) => {
      nock('https://www.omdbapi.com')
        .get(`/?t=iron%20man&apikey=${config.OMDB_API_KEY}`)
        .reply(200, movieMockResponse);

      request(app)
        .post('/api/v1/movie')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'iron man',
        })
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(201);
          expect(res.body.code).to.be.equal(201);
          expect(res.body.status).to.be.equal('success');
          expect(res.body.message).to.be.equal('Movie created successfully');
          done();
        });
    });

    it('should not create a movie that exists', (done) => {
      nock('https://www.omdbapi.com')
        .get(`/?t=iron%20man&apikey=${config.OMDB_API_KEY}`)
        .reply(200, movieMockResponse);

      request(app)
        .post('/api/v1/movie')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'iron man',
        })
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(400);
          expect(res.body.code).to.be.equal(400);
          expect(res.body.status).to.be.equal('error');
          done();
        });
    });

    it('should throw error for missing fields', (done) => {
      request(app)
        .post('/api/v1/movie')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({})
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(400);
          expect(res.body.code).to.be.equal(400);
          expect(res.body.status).to.be.equal('error');
          done();
        });
    });

    it('should throw error for invalid token', (done) => {
      request(app)
        .post('/api/v1/movie')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}s`)
        .send({})
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(401);
          expect(res.body.code).to.be.equal(401);
          expect(res.body.status).to.be.equal('error');
          done();
        });
    });
  });

  describe('Fetch movies', () => {
    it('should fetch movies successfully', (done) => {
      request(app)
        .get('/api/v1/movie/123')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body.code).to.be.equal(200);
          expect(res.body.status).to.be.equal('success');
          expect(res.body.message).to.be.equal('Movies fetched successfully');
          done();
        });
    });

    it('should not fetch movies for unauthorized user', (done) => {
      request(app)
        .get('/api/v1/movie/123')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}s`)
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(401);
          expect(res.body.code).to.be.equal(401);
          expect(res.body.status).to.be.equal('error');
          done();
        });
    });

    it('should throw error for ID of string type', (done) => {
      request(app)
        .get('/api/v1/movie/1a')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(400);
          expect(res.body.code).to.be.equal(400);
          expect(res.body.status).to.be.equal('error');
          done();
        });
    });
  })
});
