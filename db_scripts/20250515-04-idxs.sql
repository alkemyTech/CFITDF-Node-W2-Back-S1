USE Alke_biblioteca;

ALTER TABLE `Categorias` ADD INDEX idx_nombre_categoria (`nombre_categoria`);

ALTER TABLE `Ejemplares` ADD CONSTRAINT Ejemplares_UNIQUE UNIQUE KEY (id_libro,numero);
ALTER TABLE `Ejemplares` ADD INDEX idx_estado (`estado`);

ALTER TABLE `Libros` ADD INDEX idx_titulo (`titulo`);

ALTER TABLE `Prestamos` ADD INDEX idx_devolucion (`devolucion`);

CREATE INDEX idx_user_apellidos_nombres USING BTREE ON `Usuarios` (apellidos, nombres);
