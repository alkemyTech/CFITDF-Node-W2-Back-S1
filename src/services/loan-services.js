import { LoanModel, CopyModel, UserModel, BookModel } from "../models/index.js";
import { Sequelize } from "../config/db-connection.js";

export class LoanService {
  async createLoan(loanData) {
    return await Sequelize.transaction(async (t) => {
      // Verificar que el ejemplar esté disponible
      const copia = await CopyModel.findByPk(loanData.id_ejemplar, {
        include: [{
          model: LoanModel,
          as: 'ejemplar_prestamos',
          where: { fecha_devolucion: null },
          required: false
        }],
        transaction: t
      });

      if (copia.ejemplar_prestamos && copy.ejemplar_prestamos.length > 0) {
        throw new Error('El ejemplar ya está prestado');
      }

      // Crear el préstamo
      const loan = await LoanModel.create(loanData, { transaction: t });
      
      return loan;
    });
  }

  async returnLoan(loanId) {
    return await Sequelize.transaction(async (t) => {
      const loan = await LoanModel.findByPk(loanId, { transaction: t });
      if (!loan) {
        throw new Error('Préstamo no encontrado');
      }
      if (loan.fecha_devolucion) {
        throw new Error('El préstamo ya fue devuelto');
      }

      loan.fecha_devolucion = new Date();
      await loan.save({ transaction: t });
      
      return loan;
    });
  }

  async getActiveLoans() {
    return await LoanModel.findAll({
      where: { fecha_devolucion: null },
      include: [
        { 
          model: UserModel, 
          as: 'prestamos_usuario',
          attributes: ['nombres', 'apellidos', 'dni']
        },
        { 
          model: CopyModel, 
          as: 'prestamos_ejemplar',
          include: [{
            model: BookModel,
            as: 'ejemplares_libro',
            attributes: ['titulo', 'isbn']
          }]
        }
      ],
      order: [['fecha_prestamo', 'ASC']]
    });
  }

  async getUserLoans(userId) {
    return await LoanModel.findAll({
      where: { id_usuario: userId },
      include: [
        { 
          model: CopyModel, 
          as: 'prestamos_ejemplar',
          include: [{
            model: BookModel,
            as: 'ejemplares_libro',
            attributes: ['titulo', 'isbn']
          }]
        }
      ],
      order: [['fecha_prestamo', 'DESC']]
    });
  }

  async getOverdueLoans() {
    const dosSemanas = new Date();
    dosSemanas.setDate(dosSemanas.getDate() - 14);

    return await LoanModel.findAll({
      where: {
        fecha_prestamo: { [Sequelize.Op.lt]: dosSemanas },
        fecha_devolucion: null
      },
      include: [
        { 
          model: UserModel, 
          as: 'prestamos_usuario',
          attributes: ['nombres', 'apellidos', 'email']
        },
        { 
          model: CopyModel, 
          as: 'prestamos_ejemplar',
          include: [{
            model: BookModel,
            as: 'ejemplares_libro',
            attributes: ['titulo']
          }]
        }
      ]
    });
  }
}