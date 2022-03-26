import { expect } from 'chai';
import request from 'supertest';
import nock from 'nock';
import app from '../../app';
import config from '../../app/config';
import movieMockResponse from '../mocks/movie.mock.json';

describe('Movie API', () => {
  describe('Create movie', () => {
    it('should create a movie successfully', (done) => {
      nock('https://www.omdbapi.com')
        .get(`/?t=iron%20man&apikey=${config.OMDB_API_KEY}`)
        .reply(200, movieMockResponse);

      request(app)
        .post('/api/v1/movie')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${process.env.BASIC_USER_TOKEN}`)
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
        .set('Authorization', `Bearer ${process.env.BASIC_USER_TOKEN}`)
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
        .set('Authorization', `Bearer ${process.env.BASIC_USER_TOKEN}`)
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
        .set('Authorization', `Bearer ${process.env.BASIC_USER_TOKEN}s`)
        .send({})
        .end((req, res) => {
          expect(res.statusCode).to.be.equal(401);
          expect(res.body.code).to.be.equal(401);
          expect(res.body.status).to.be.equal('error');
          done();
        });
    });
  });
});
