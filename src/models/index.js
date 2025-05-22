import { BookModel} from "../models/book-model.js";
import { CategoryModel} from "../models/category-model.js";
import { CopyModel } from "../models/copy-model.js";
import { LoanModel } from "./loan-model.js";
import { RolModel } from "./rol-model.js";
import { UserModel } from "./user-model.js";

// Libros pertenece a Categoría
BookModel.belongsTo(CategoryModel, {
    foreignKey: "id_categoria",
    as: "libros_categoria"
})
CategoryModel.hasMany(BookModel, {
    foreignKey: "id_categoria",
    as: "categoria_libros"
})

// Ejemplares pertenece a Libro
CopyModel.belongsTo(BookModel, {
    foreignKey: "id_libro",
    as: "ejemplares_libro"
})
BookModel.hasMany(CopyModel, {
    foreignKey: "id_libro",
    as: "libro_ejemplares"
    })

// Prestamos pertenece a Ejemplar
LoanModel.belongsTo(CopyModel, {
    foreignKey: "id_ejemplar",
    as: "prestamos_ejemplar"
})
CopyModel.hasMany(LoanModel, {
    foreignKey: "id_ejemplar",
    as: "ejemplar_prestamos"
    })

// Prestamos pertenece a Usuario
LoanModel.belongsTo(UserModel, {
    foreignKey: "id_usuario",
    as: "prestamos_usuario"
})
UserModel.hasMany(LoanModel, {
    foreignKey: "id_usuario",
    as: "usuario_prestamos"
    })

// Usuarios pertenece a Rol
UserModel.belongsTo(RolModel, {
    foreignKey: "id_rol",
    as: "usuarios_rol"
})
RolModel.hasMany(UserModel, {
    foreignKey: "id_rol",
    as: "rol_usuarios"
    })

export default {
    BookModel,
    CategoryModel,
    CopyModel,
    LoanModel,
    RolModel,
    UserModel
}
