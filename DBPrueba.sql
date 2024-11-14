-- Eliminar la base de datos si ya existe
DROP DATABASE IF EXISTS TrabajoPrueba;

-- Crear la base de datos
CREATE DATABASE TrabajoPrueba;

-- Usar la base de datos
USE TrabajoPrueba;

-- Tabla de Usuario 
CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo_electronico VARCHAR(100) UNIQUE NOT NULL,
    usuario VARCHAR(50) UNIQUE NOT NULL,
    clave VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE,
    telefono VARCHAR(20),
    direccion VARCHAR(255),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rol ENUM('admin', 'usuario', 'moderador') DEFAULT 'usuario',
    estado ENUM('activo', 'inactivo') DEFAULT 'activo'
);
