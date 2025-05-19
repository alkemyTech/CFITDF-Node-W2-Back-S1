-- SENTENCIAS DML (INSERT, UPDATE, DELETE) para simular registros.

USE Alke_biblioteca;

-- Doss roles: Admin y user
INSERT INTO Roles (nombre_rol) VALUES ('administrador'),('cliente');

INSERT INTO Usuarios (dni, nombres, apellidos, email, id_rol) VALUES 
(36301921, 'Pablo', 'Jusim', 'pablo@gmail.com', 2),
(37845112, 'Cesar', 'Segovia', 'cesar@gmail.com', 2),
(35250620, 'Juan Pablo', 'Schiemann', 'juanpablo@gmail.com', 1),
(40920118, 'Emeli', 'Medina', 'emelimedina@gmail.com', 1);

-- Caterogias a modo de ejemplo ámbito tech.
INSERT INTO Categorias (nombre_categoria) VALUES
('Programación'), ('Ciencia de Datos'), ('Inteligencia Artificial');

INSERT INTO Libros (titulo, isbn, editorial, autor, disponible, id_categoria) VALUES
('Aprendiendo Python', '9781491946008', 'O’Reilly Media', 'Luciano Ramalho', TRUE, 1),
('Data Science from Scratch', '9781492041139', 'O’Reilly Media', 'Joel Grus', TRUE, 2),
('AI Superpowers', '9781328546395', 'Houghton Mifflin Harcourt', 'Kai-Fu Lee', FALSE, 3);

INSERT INTO Ejemplares (id_ejemplar, id_libro, numero, estado)VALUES
(1, 1, 1, 'Disponible'),
(2, 1, 2, 'Disponible'),
(3, 2, 1, 'Disponible'),
(4, 3, 1, 'Disponible');

INSERT INTO Prestamos (id_usuario, id_ejemplar, creacion, devolucion)VALUES
(1, 1, '2024-04-01', NULL),
(3, 3, '2024-03-15', '2024-03-30');

-- UPDATE con modificacion de correo
UPDATE Usuarios SET email = 'medinaemelialdana@gmail.com'
WHERE nombres = 'Emeli' AND apellidos = 'Medina';

-- UPDATE de prueba de que ejemplar fue prestado
UPDATE Ejemplares SET estado = 'Prestado'
WHERE id_ejemplar = 1;

-- DELETE de categoria sin uso por el momento.
DELETE FROM Categorias 
WHERE nombre_categoria = 'Inteligencia Artificial';

-- DELETE del préstamo de césar suponiendo que se equivocó de ejemplar.
DELETE FROM Prestamos WHERE id_usuario = 3 AND id_ejemplar = 3;

-- UPDATE para no prestar libros en caso de que se hayan quemado o dañado, etc. 
UPDATE Libros SET disponible = FALSE
WHERE titulo = 'AI Superpowers';


