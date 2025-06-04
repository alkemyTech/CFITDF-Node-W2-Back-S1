/* Correr el script: scripts/update-db.sql para actualizar tu base de datos y evitar errores con Sequelize
Para que las pruebas funcionen, agregá esta columna a tu base de datos local: */
ALTER TABLE Usuarios ADD COLUMN deletedAt DATETIME;