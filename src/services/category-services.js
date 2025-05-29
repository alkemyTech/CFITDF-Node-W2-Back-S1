import { CategoryModel, BookModel } from "../models/index.js";

export class CategoryService {
  async getAll() {
    return await CategoryModel.findAll({
      include: [{
        model: BookModel,
        as: 'categoria_libros',
        attributes: ['id_libro', 'titulo', 'disponible']
      }],
      order: [['nombre_categoria', 'ASC']] // Ordenar por nombre de categoría. Correccion de la línea original
    });
  }

  async getById(id) {
    return await CategoryModel.findByPk(id, {
      include: [{
        model: BookModel,
        as: 'categoria_libros',
        attributes: ['id_libro', 'titulo', 'disponible']
      }]
    });
  }

  async create(categoryData) {
    return await CategoryModel.create(categoryData);
  }

  async update(id, categoryData) {
    const [updated] = await CategoryModel.update(categoryData, {
      where: { id_categoria: id }
    });
    if (updated) {
      return await this.getById(id);
    }
    return null;
  }

  async delete(id) {
    const category = await this.getById(id);
    if (category.categoria_libros && category.categoria_libros.length > 0) {
      throw new Error('No se puede eliminar una categoría con libros asociados');
    }
    return await CategoryModel.destroy({ where: { id_categoria: id } });
  }
}