USE pelicula;

DROP TABLE `pelicula`;

CREATE TABLE `pelicula` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) DEFAULT NULL,
  `duracion` int(5) DEFAULT NULL,
  `director` varchar(400) DEFAULT NULL,
  `anio` int(5) DEFAULT NULL,
  `fecha_lanzamiento` date DEFAULT NULL,
  `puntuacion` int(2) DEFAULT NULL,
  `poster` varchar(300) DEFAULT NULL,
  `trama` varchar(700) DEFAULT NULL,
  `genero_id` int(11) DEFAULT NULL,
  FOREIGN KEY (genero_id) REFERENCES genero(id),
  PRIMARY KEY (`id`)
);
