'use strict'
var bcrypt = require('bcrypt-nodejs'); 						/****************** Declaraciones ********************/
var Tarea = require('../models/tarea');	 				    /*** En esta seccion se  declaran las importaciones***/
var jwt = require('../services/jwt'); 						/*** necesarias para el funcionamiento             ***/
var fs = require('fs'); 									/*****************************************************/
var path = require('path');




function guardarTarea(req, res) {
	var tarea = new Tarea();

	var params = req.body;



	tarea.cod_tarea = params.cod_tarea; //obligatorio
	tarea.proyecto = params.proyecto; //obligatorio
	tarea.nombre = params.nombre;
	tarea.descripcion = params.descripcion;
	tarea.max_horas = params.max_horas;
	tarea.estado = params.estado;


	tarea.save((err, tareaStored) => {
		if (err) {

			res.status(500).send({
				message : 'Error al guardar la tarea'
			});

		} else {

			if (!tareaStored) {
				res.status(404).send({
					message : 'No se ha registrado la tarea'
				});

			} else {

				res.status(200).send({
					tarea : tareaStored
				});

			}

		}

	});


}


function obtenerTareasPorProyecto(req, res) {
	
	var proyecto = req.params.proyecto;
	
	Tarea.find({'proyecto':proyecto}).populate({
		path : 'proyecto'
	}).exec((err, tareas) => {

		if (err) {
			console.log(err);
			res.status(500).send({
				message : 'Error en la peticion'
			});

		} else {
			if (!tareas) {

				res.status(404).send({
					message : 'No existen tareas asociadas al proyecto'
				});
			} else {

				res.status(200).send({
					tareas
				});


			}

		}

	});

}

function obtenerTarea(req, res) {
	
	var id_tarea = req.params.id;
	
	Tarea.find({'_id':id_tarea}).populate({
		path : 'proyecto'
	}).exec((err, tarea) => {

		if (err) {
			console.log(err);
			res.status(500).send({
				message : 'Error en la peticion'
			});

		} else {
			if (!tarea) {

				res.status(404).send({
					message : 'No existe la tarea'
				});
			} else {

				res.status(200).send({
					tarea
				});


			}

		}

	});

}



function actualizarTarea(req, res) {
	var id_tarea = req.params.id;
	var update = req.body;

	Tarea.findByIdAndUpdate(id_tarea, update, (err, tareaUpdated) => {
		if (err) {
			res.status(500).send({
				message : 'Error al actualizar la tarea'
			});

		} else {

			if (!tareaUpdated) {

				res.status(404).send({
					message : 'No se ha podido actualizar la tarea'
				});

			} else {

				res.status(200).send({
					user : tareaUpdated
				});

			}
		}


	});

}

function eliminarTarea(req, res) {
	var id_tarea = req.params.id;


	Tarea.findByIdAndRemove(id_tarea, (err, tareaRemoved) => {
		if (err) {
			res.status(500).send({
				message : 'Error al eliminar la tarea'
			});

		} else {

			if (!tareaRemoved) {

				res.status(404).send({
					message : 'No se ha podido eliminar la tarea'
				});

			} else {

				res.status(200).send({
					tarea : tareaRemoved
				});

			}
		}


	});


}

module.exports = {
	guardarTarea ,
	obtenerTareasPorProyecto,
	actualizarTarea ,
	eliminarTarea,
	obtenerTarea
}