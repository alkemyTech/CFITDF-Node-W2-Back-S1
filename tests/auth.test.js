// Para probar auth-login
import * as chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server.js'; 

chai.use(chaiHttp);
const expect = chai.expect;

describe('Auth - Login', () => {
  it('debería hacer login exitoso con credenciales válidas', async () => {
    const res = await chai.request(app)
      .post('/auth/login')
      .send({
        email: 'emelimedina@gmail.com',
        password: '123456'
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('user');
    expect(res.body).to.have.property('message');
  });

  it('debería fallar con credenciales inválidas', async () => {
    const res = await chai.request(app)
      .post('/auth/login')
      .send({
        email: 'emelimedina@gmail.com',
        password: 'contraseña_incorrecta'
      });

    expect(res.status).to.equal(401);
    expect(res.body.message).to.equal('Authentication failed');
  });
});
