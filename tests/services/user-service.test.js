// Para probar metodos del user services. Test para getByEmail 
import { expect } from 'chai';
import { UserService } from '../../src/services/user-services.js';

const userService = new UserService();

describe('UserService - getByEmail()', () => {
  it('debería devolver un usuario existente', async () => {
    const user = await userService.getByEmail('emelimedina@gmail.com');
    expect(user).to.be.an('object');
    expect(user.email).to.equal('emelimedina@gmail.com');
  });

  it('debería devolver null si el email no existe', async () => {
    const user = await userService.getByEmail('noexiste@example.com');
    expect(user).to.be.null;
  });
});