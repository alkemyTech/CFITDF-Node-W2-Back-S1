// Para probar auth-login
import request from 'supertest';
import { expect } from 'chai';
import app from '../src/server.js';

describe('Auth - Login', () => {
  it('debería hacer login exitoso con credenciales válidas', async () => {
    const res = await request(app) // <--- corregido
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
    const res = await request(app) // <--- corregido
      .post('/auth/login')
      .send({
        email: 'emelimedina@gmail.com',
        password: 'contraseña_incorrecta'
      });

    expect(res.status).to.equal(401);
    expect(res.body.message).to.equal('Authentication failed');
  });
});