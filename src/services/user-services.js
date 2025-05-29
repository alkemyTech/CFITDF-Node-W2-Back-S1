import { UserModel } from "../models/user-model.js";

export class UserService {
    async getAll() {
        return await UserModel.findAll();
    }

    async getById(id) {
        return await UserModel.findByPk(id);
    }

    async getByDni(dni) {
        return await UserModel.findOne({ where: { dni } });
    }

    async getByEmail(email) {
        return await UserModel.findOne({ where: { email } });
    }

    async create(userData) {
        // Hashear la contraseña antes de guardar
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;

        return await UserModel.create(userData);
    }

    async update(id, userData) {
        const [updated] = await UserModel.update(userData, {
            where: { id_usuario: id }
        });
        if (updated) {
            return await this.getById(id);
        }
        return null;
    }

    async delete(id) {
        const deleted = await UserModel.destroy({
            where: { id_usuario: id }
        });
        return deleted > 0;
    }

    async getByRole(roleId) {
        return await UserModel.findAll({
            where: { id_rol: roleId }
        });
    }
}