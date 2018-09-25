'use strict'
var bcrypt = require('bcrypt-nodejs'); 						/****************** Declaraciones ********************/
var Proyecto = require('../models/proyecto'); 				/*** En esta seccion se  declaran las importaciones***/
var jwt = require('../services/jwt'); 						/*** necesarias para el funcionamiento             ***/
var fs = require('fs'); 									/*****************************************************/
var path = require('path');




function guardarProyecto(req, res) {
	var proyecto = new Proyecto();

	var params = req.body;



	proyecto.cod_proyecto = params.cod_proyecto; //obligatorio
	proyecto.nombre = params.nombre; //obligatorio
	proyecto.tipo = params.tipo; //obligatorio
	proyecto.descripcion = params.descripcion;
	proyecto.jefe_proyecto = params.jefe_proyecto; //obligatorio
	proyecto.estado = params.estado; //obligatorio
	proyecto.area = params.area;
	proyecto.sector = params.sector;



	proyecto.save((err, proyectoStored) => {
		if (err) {

			res.status(500).send({
				message : 'Error al guardar el proyecto'
				
			});
			console.log(err);
		} else {

			if (!proyectoStored) {
				res.status(404).send({
					message : 'No se ha registrado el proyecto'
				});

			} else {

				res.status(200).send({
				Proyecto : proyectoStored
				});

			}

		}

	});


}


function obtenerProyectos(req, res) {
	Proyecto.find().populate({
		path : 'jefe_proyecto'
	}).exec((err, proyectos) => {

		if (err) {
			console.log(err);
			res.status(500).send({
				message : 'Error en la peticion'
			});

		} else {
			if (!proyectos) {

				res.status(404).send({
					message : 'No existen proyectos'
				});
			} else {

				res.status(200).send({
					proyectos
				});


			}

		}

	});

}

function obtenerProyecto(req, res) {
	var id_proyecto = req.params.id;
	Proyecto.findOne({'_id':id_proyecto}).populate({path :'jefe_proyecto'}).exec((err, proyecto) => {

		if (err) {
			console.log(err);
			res.status(500).send({
				message : 'Error en la peticion'
			});

		} else {
			if (!proyecto) {

				res.status(404).send({
					message : 'No existe el proyecto'
				});
			} else {

				res.status(200).send({
					proyecto
				});


			}

		}

	});

}



function actualizarProyecto(req, res) {
	var id_proyecto = req.params.id;
	var update = req.body;

	Proyecto.findByIdAndUpdate(id_proyecto, update, (err, proyectoUpdated) => {
		if (err) {
			res.status(500).send({
				message : 'Error al actualizar el proyecto'
			});

		} else {

			if (!proyectoUpdated) {

				res.status(404).send({
					message : 'No se ha podido actualizar el proyecto'
				});

			} else {

				res.status(200).send({
					user : proyectoUpdated
				});

			}
		}


	});

}

function eliminarProyecto(req, res) {
	var id_proyecto = req.params.id;


	Proyecto.findByIdAndRemove(id_proyecto, (err, proyectoRemoved) => {
		if (err) {
			res.status(500).send({
				message : 'Error al eliminar el proyecto'
			});

		} else {

			if (!proyectoRemoved) {

				res.status(404).send({
					message : 'No se ha podido eliminar el proyecto'
				});

			} else {

				res.status(200).send({
					proyecto : proyectoRemoved
				});

			}
		}


	});


}

module.exports = {
	guardarProyecto ,
	obtenerProyectos ,
	actualizarProyecto ,
	eliminarProyecto,
	obtenerProyecto
}