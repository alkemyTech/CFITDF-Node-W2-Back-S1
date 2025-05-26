import { RolModel, UserModel } from "../models/index.js";

export class RolService {
  async getAll() {
    return await RolModel.findAll({
      include: [{
        model: UserModel,
        as: 'rol_usuarios',
        attributes: ['nombres', 'apellidos', 'email']
      }],
      order: [['nombre', 'ASC']]
    });
  }

  async getById(id) {
    return await RolModel.findByPk(id, {
      include: [{
        model: UserModel,
        as: 'rol_usuarios',
        attributes: ['nombres', 'apellidos', 'email']
      }]
    });
  }

  async create(rolData) {
    return await RolModel.create(rolData);
  }

  async update(id, rolData) {
    const [updated] = await RolModel.update(rolData, {
      where: { id_rol: id }
    });
    if (updated) {
      return await this.getById(id);
    }
    return null;
  }

  async delete(id) {
    const rol = await this.getById(id);
    if (rol.rol_usuarios && rol.rol_usuarios.length > 0) {
      throw new Error('No se puede eliminar un rol con usuarios asignados');
    }
    return await RolModel.destroy({ where: { id_rol: id } });
  }
}