// Para probar books empezando por GET
import request from 'supertest';
import { expect } from 'chai';
import app from '../src/server.js';

describe('Books - GET /books', () => {
  it('devuelve una lista de libros', async () => {
    const res = await request(app).get('/books');

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});