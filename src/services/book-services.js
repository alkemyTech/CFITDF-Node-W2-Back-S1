// book-service.js
import { BookModel } from "../models/book-model.js";

export class BookService {
    async getAll() {
        return await BookModel.findAll();
    }

    async getById(id) {
        return await BookModel.findByPk(id);
    }

    async create(bookData) {
        return await BookModel.create(bookData);
    }

    async update(id, bookData) {
        const [updated] = await BookModel.update(bookData, {
            where: { id_libro: id }
        });
        if (updated) {
            return await this.getById(id);
        }
        return null;
    }

    async delete(id) {
        const deleted = await BookModel.destroy({
            where: { id_libro: id }
        });
        return deleted > 0;
    }

    async getByCategory(categoryId) {
        return await BookModel.findAll({
            where: { id_categoria: categoryId }
        });
    }
}