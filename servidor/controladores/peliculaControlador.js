var con = require('../lib/conexionbd');

function peliculas(req, res) {
    let sql;
    const params = req.query;
    if (params.anio !== undefined) {
        sql = "select * from pelicula where anio= " + params.anio;
        if (params.titulo !== undefined) {
            sql += " and titulo like " + "'%" + params.titulo + "%'";
            if (params.genero !== undefined) {
                sql += " and genero_id= "  + params.genero;
            }
        }
    }
    else if (params.titulo !== undefined) {
        sql = "select * from pelicula where titulo like " + "'%" + params.titulo + "%'";
        if (params.genero !== undefined) {
            sql +=  " and genero_id= " +  params.genero;

        }
    }
    else if (params.genero !== undefined) {
        sql = "select * from pelicula where genero_id= " + parseInt(params.genero);
    }
    else {
        sql = "select * from pelicula"
    }
    let sqlResult = sql;
    sql += " ORDER BY " + params.columna_orden + " " + params.tipo_orden + " limit " + (params.pagina * 20)
    con.query(sql, function (error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta de peliculas");
        }
        con.query(sqlResult, function (error, resultadoResultado, fields) {
            var response = {
                'peliculas': resultado,
                'total': resultadoResultado.length
            };
            res.send(JSON.stringify(response));
        });
    });
}

function recomendaciones(req, res) {
    let sql;
    const params = req.query;
    if (params.genero !== undefined) {
        sql = "select * from pelicula inner join genero on genero.id = pelicula.genero_id where genero.nombre = "+  "'" +params.genero +  "'" ;
        if (params.anio_inicio !== undefined) {
            sql += " and pelicula.anio > " + params.anio_inicio ;
            if (params.anio_fin !== undefined) {
                sql += " and pelicula.anio <= "  + params.anio_fin;
            }
            if (params.puntuacion !== undefined) {
                sql += " and pelicula.puntuacion= "  + params.puntuacion;
            }
        }
    }
    else if (params.anio_inicio !== undefined) {
        sql = "select * from pelicula where anio > " + params.anio_inicio;
        if (params.anio_fin !== undefined) {
            sql += " and anio <= "  + params.anio_fin;
        }
        if (params.puntuacion !== undefined) {
            sql += " and puntuacion= "  + params.puntuacion;
        }
    }
    con.query(sql, function (error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la recomendacion");
        }
            var response = {
                'peliculas': resultado,
            };
            res.send(JSON.stringify(response));
    });
}

function generos(req, res) {
    var sql = "select * from genero"
    con.query(sql, function (error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta de generos");
        }
        var response = {
            'generos': resultado
        };

        res.send(JSON.stringify(response));
    });
}

function actorPelicula (req, res) {
    const params = req.params;
    var sql = "select * from pelicula where id =" + params.id
    con.query(sql, function (error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta de la pelicula", error.message);
            return res.status(404).send("Hubo un error en la consulta de la pelicula");
        }
        var sql1 = "select nombre from actor_pelicula inner join pelicula on actor_pelicula.pelicula_id  = pelicula.id  inner join actor on actor_pelicula.actor_id = actor.id where pelicula.id = " + params.id
        con.query(sql1, function (error, resultadoActor, fields) {
            if (error) {
                console.log("Hubo un error en la consulta del actor", error.message);
                return res.status(404).send("Hubo un error en la consulta del actor");
            }
            var sql2 = "select nombre from genero inner join pelicula on genero.id  = pelicula.genero_id where pelicula.id =" + params.id
        con.query(sql2, function (error, resultadoGenero, fields) {
            if (error) {
                console.log("Hubo un error en la consulta del genero", error.message);
                return res.status(404).send("Hubo un error en la consulta del genero");
            }
            //console.log(resultado)
            //console.log(resultadoActor)
            //console.log(resultadoGenero)
            var response = {
                'pelicula': resultado[0],
                'actores': resultadoActor,
                'nombre': resultadoGenero[0].nombre,
            };
            res.send(JSON.stringify(response));
        });
        });

    });
}

function buscarNombre(req, res) {
    var id = req.params.id;
    var sql = "select * from usuario where id = " + id;
    con.query(sql, function (error, resultado, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        if (resultado.length == 0) {
            console.log("No se encontro ningún nombre con ese id");
            return res.status(404).send("No se encontro ningún nombre con ese id");
        } else {
            var response = {
                'nombre': resultado[0].nombre
            };

            res.send(JSON.stringify(response));
        }

    });
}

module.exports = {
    peliculas: peliculas,
    generos: generos,
    buscarNombre: buscarNombre,
    actorPelicula: actorPelicula,
    recomendaciones: recomendaciones,
};