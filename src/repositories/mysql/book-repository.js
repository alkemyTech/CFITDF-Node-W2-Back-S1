import { BookModel } from '../models/book-model.js';
import MysqlRepository from './mysql-repository.js';

export default class BookRepository extends MysqlRepository {
    constructor() {
        super(BookModel);
    }
}

export const bookRepositoryMySQL = new BookRepository();