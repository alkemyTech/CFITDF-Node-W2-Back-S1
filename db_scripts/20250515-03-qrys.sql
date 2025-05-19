USE Alke_biblioteca;

-- Consulta para identificar usuarios con préstamos pendientes
SELECT u.nombres, u.apellidos, u.email
FROM Usuarios u
WHERE u.id_usuario IN (
    -- Subconsulta: Usuarios con préstamos sin fecha de devolución
    SELECT p.id_usuario
    FROM Prestamos p
    WHERE p.devolucion IS NULL
);

-- Consulta para mostrar libros disponibles con su categoría y cantidad de ejemplares
SELECT l.titulo, l.autor, c.nombre_categoria, 
       (SELECT COUNT(*) 
        FROM Ejemplares e 
        WHERE e.id_libro = l.id_libro AND e.estado = 'Disponible') AS ejemplares_disponibles
FROM Libros l
JOIN Categorias c ON l.id_categoria = c.id_categoria
WHERE l.disponible = TRUE;

-- Consulta detallada de préstamos por usuario con información de libros
SELECT 
    u.nombres,
    u.apellidos,
    (SELECT COUNT(*)
     FROM Prestamos p
     WHERE p.id_usuario = u.id_usuario) AS total_prestamos,
    (SELECT GROUP_CONCAT(DISTINCT l.titulo SEPARATOR ', ')
     FROM Prestamos p
     JOIN Ejemplares e ON p.id_ejemplar = e.id_ejemplar
     JOIN Libros l ON e.id_libro = l.id_libro
     WHERE p.id_usuario = u.id_usuario) AS libros_prestados
FROM Usuarios u
WHERE u.id_rol = (SELECT id_rol FROM Roles WHERE nombre_rol = 'cliente');

-- Consulta que clasifica libros por popularidad basada en préstamos
SELECT 
    l.titulo,
    l.autor,
    (SELECT COUNT(*) 
     FROM Prestamos p
     JOIN Ejemplares e ON p.id_ejemplar = e.id_ejemplar
     WHERE e.id_libro = l.id_libro) AS total_prestamos,
    RANK() OVER (ORDER BY (SELECT COUNT(*) 
                          FROM Prestamos p
                          JOIN Ejemplares e ON p.id_ejemplar = e.id_ejemplar
                          WHERE e.id_libro = l.id_libro) DESC) AS ranking
FROM Libros l
ORDER BY total_prestamos DESC;

-- Consulta para categorías con cantidad de libros disponibles
SELECT c.nombre_categoria, 
       (SELECT COUNT(*) 
        FROM Libros l 
        WHERE l.id_categoria = c.id_categoria AND l.disponible = TRUE) AS libros_disponibles
FROM Categorias c
ORDER BY libros_disponibles DESC;