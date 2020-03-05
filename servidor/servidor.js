//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var peliculaControlador = require('./controladores/peliculaControlador');
var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.get('/peliculas',peliculaControlador.peliculas);
app.get('/peliculas/:pagina/:titulo/:cantidad/:columna_orden/:tipo_orden/:anio',peliculaControlador.peliculas);
app.get('/generos',peliculaControlador.generos);
app.get('/peliculas/recomendacion',peliculaControlador.recomendaciones);
app.get('/peliculas/:id',peliculaControlador.actorPelicula);
//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});

