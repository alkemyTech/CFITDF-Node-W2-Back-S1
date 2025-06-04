// Para probar books empezando por GET
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server.js';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Books - GET /books', () => {
  it('devuelve una lista de libros', async () => {
    const res = await chai.request(app).get('/books');

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});