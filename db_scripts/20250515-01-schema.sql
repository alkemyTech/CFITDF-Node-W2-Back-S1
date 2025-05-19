CREATE DATABASE Alke_biblioteca;
USE Alke_biblioteca;

CREATE TABLE Roles (
id_rol		int			NOT NULL auto_increment,
nombre_rol	varchar(50)	NOT NULL,
PRIMARY KEY	(id_rol)
);

CREATE TABLE Usuarios (
id_usuario	int				NOT NULL auto_increment,
dni			int				NOT NULL unique,
nombres		varchar(80)		NOT NULL,
apellidos	varchar(80)		NOT NULL,
email		varchar(255)	NOT NULL unique,
id_rol		int				NOT NULL,
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
titulo		    varchar(255)	NOT NULL,
isbn	    	varchar(20)		NOT NULL unique,
editorial   	varchar(255)	NOT NULL,
autor		    varchar(255)	NOT NULL,
disponible  	boolean			NOT NULL,
id_categoria	int				NOT NULL,
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
PRIMARY KEY (id_ejemplar)
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