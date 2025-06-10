CREATE DATABASE Alke_biblioteca;
USE Alke_biblioteca;

CREATE TABLE Roles (
id_rol		int			NOT NULL auto_increment,
nombre_rol	varchar(50)	NOT NULL,
PRIMARY KEY	(id_rol)
);

CREATE TABLE Usuarios (
CREATE TABLE Usuarios (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `id_rol` int NOT NULL,
  `dni` int NOT NULL,
  `nombres` varchar(80) NOT NULL,
  `apellidos` varchar(80) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
PRIMARY KEY	(id_usuario),
INDEX (dni),
FOREIGN KEY (id_rol) REFERENCES Roles(id_rol)
);

PRIMARY KEY	(id_usuario),
INDEX (dni),
FOREIGN KEY (id_rol) REFERENCES Roles(id_rol)
);

CREATE TABLE Categorias (
id_categoria    	int			NOT NULL auto_increment,
nombre_categoria	varchar(80)	NOT NULL,
PRIMARY KEY	(id_categoria)
);

CREATE TABLE  Libros (
id_libro	    int				NOT NULL auto_increment,
id_categoria	int				NOT NULL,
titulo		    varchar(255)	NOT NULL,
isbn	    	varchar(20)		NOT NULL unique,
editorial   	varchar(255)	NOT NULL,
autor		    varchar(255)	NOT NULL,
disponible  	boolean			NOT NULL,
PRIMARY KEY	(id_libro),
INDEX (titulo),
INDEX (autor),
FOREIGN KEY (id_categoria) REFERENCES Categorias(id_categoria)
);

CREATE TABLE Ejemplares (
id_ejemplar	int			NOT NULL,
id_libro	int			NOT NULL,
numero		int			NOT NULL,
estado		varchar(25)	NOT NULL,
PRIMARY KEY (id_ejemplar),
FOREIGN KEY (id_libro) REFERENCES Libros(id_libro)
);

CREATE TABLE Prestamos (
id_prestamo	int		NOT NULL auto_increment,
id_usuario	int		NOT NULL,
id_ejemplar	int		NOT NULL,
creacion	date	NOT NULL,
devolucion	date	NULL,
PRIMARY KEY	(id_prestamo),
FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
FOREIGN KEY (id_ejemplar) REFERENCES Ejemplares(id_ejemplar)
);