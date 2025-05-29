import { BookService } from "../services/book-services.js";
import { UserService } from "../services/user-services.js";
import { CategoryService } from "../services/category-services.js";
import { CopyService } from "../services/copy-services.js";
import { LoanService } from "../services/loan-services.js";
import { RolService } from "../services/rol-services.js";

import { BookControllers } from "./book-controllers.js";
import { UserControllers } from "./user-controllers.js";
import { CategoryControllers } from "./category-controllers.js";
import { CopyControllers } from "./copy-controllers.js";
import { LoanControllers } from "./loan-controllers.js";
import { RolControllers } from "./rol-controllers.js";


const bookService = new BookService();
const userService = new UserService();
const categoryService = new CategoryService();
const copyService = new CopyService();
const loanService = new LoanService();
const rolService = new RolService();


export const bookControllers = new BookControllers(bookService);
export const userControllers = new UserControllers(userService);
export const categoryControllers = new CategoryControllers(categoryService);
export const copyControllers = new CopyControllers(copyService);
export const loanControllers = new LoanControllers(loanService);
export const rolControllers = new RolControllers(rolService);