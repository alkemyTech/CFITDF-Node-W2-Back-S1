import { CopyModel, BookModel, LoanModel } from "../models/index.js";

export class CopyService {
  async getByBook(bookId) {
    return await CopyModel.findAll({
      where: { id_libro: bookId },
      include: [
        {
          model: BookModel,
          as: 'ejemplares_libro',
          attributes: ['titulo', 'isbn']
        },
        {
          model: LoanModel,
          as: 'ejemplar_prestamos',
          where: { devolucion: null },
          required: false
        }
      ]
    });
  }

  async getById(id) {
    return await CopyModel.findByPk(id, {
      include: [
        {
          model: BookModel,
          as: 'ejemplares_libro',
          attributes: ['titulo', 'isbn']
        },
        {
          model: LoanModel,
          as: 'ejemplar_prestamos',
          include: [{
            model: UserModel,
            as: 'prestamos_usuario',
            attributes: ['nombres', 'apellidos']
          }]
        }
      ]
    });
  }

  async create(copyData) {
    return await CopyModel.create(copyData);
  }

  async update(id, copyData) {
    const [updated] = await CopyModel.update(copyData, {
      where: { id_ejemplar: id }
    });
    if (updated) {
      return await this.getById(id);
    }
    return null;
  }

  async delete(id) {
    const copy = await this.getById(id);
    if (copy.ejemplar_prestamos && copy.ejemplar_prestamos.length > 0) {
      throw new Error('No se puede eliminar un ejemplar con préstamos activos');
    }
    return await CopyModel.destroy({ where: { id_ejemplar: id } });
  }

  async getAvailableCopies(bookId) {
    return await CopyModel.findAll({
      where: { id_libro: bookId },
      include: [{
        model: LoanModel,
        as: 'ejemplar_prestamos',
        where: { fecha_devolucion: null },
        required: false
      }]
    }).then(copies => copies.filter(copy => !copy.ejemplar_prestamos || copy.ejemplar_prestamos.length === 0));
  }
}