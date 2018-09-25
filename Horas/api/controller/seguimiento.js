'use strict'
var bcrypt = require('bcrypt-nodejs'); 						/****************** Declaraciones ********************/
var Seguimiento = require('../models/seguimiento'); 		/*** En esta seccion se  declaran las importaciones***/
var jwt = require('../services/jwt'); 						/*** necesarias para el funcionamiento             ***/
var fs = require('fs'); 									/*****************************************************/
var path = require('path');




function guardarEstado(req, res) {
	var seguimiento = new Seguimiento();

	var params = req.body;



	
	seguimiento.proyecto = params.proyecto;
	seguimiento.descripcion = params.descripcion;
	seguimiento.fecha_inicio = params.fecha_inicio;
	seguimiento.fecha_termino = params.fecha_termino;
	seguimiento.responsable = params.responsable;
	seguimiento.estado = params.estado;


	seguimiento.save((err, estadoStored) => {
		if (err) {

			res.status(500).send({
				message : 'Error al guardar el estado'
				
			});
			console.log(err);
		} else {

			if (!estadoStored) {
				res.status(404).send({
					message : 'No se ha registrado el estado'
				});

			} else {

				res.status(200).send({
				Estado : estadoStored
				});

			}

		}

	});


}


function obtenerEstado(req, res) {
	
	
	Seguimiento.find().populate({path : 'proyecto'}).populate({path:'responsable'}).exec((err, estado) => {

		if (err) {
			console.log(err);
			res.status(500).send({
				message : 'Error en la peticion'
			});

		} else {
			if (!estado) {

				res.status(404).send({
					message : 'No existen seguimientos asociados al proyecto'
				});
			} else {

				res.status(200).send({
					estado
				});


			}

		}

	});

}





function actualizarEstado(req, res) {
	var id_estado = req.params.id;
	var update = req.body;

	Seguimiento.findbyIdAndUpdate(id_estado, update, (err, estadoUpdated) => {
		if (err) {
			res.status(500).send({
				message : 'Error al actualizar el estado del proyecto'
			});

		} else {

			if (!estadoUpdated) {

				res.status(404).send({
					message : 'No se ha podido actualizar el estado del proyecto'
				});

			} else {

				res.status(200).send({
					estado : estadoUpdated
				});

			}
		}


	});

}

function eliminarEstado(req, res) {
	var id_estado = req.params.id;


	Seguimiento.findbyIdAndRemove(id_estado, (err, estadoRemoved) => {
		if (err) {
			res.status(500).send({
				message : 'Error al eliminar el estado'
			});

		} else {

			if (!estadoRemoved) {

				res.status(404).send({
					message : 'No se ha podido eliminar el estado'
				});

			} else {

				res.status(200).send({
					proyecto : estadoRemoved
				});

			}
		}


	});


}

module.exports = {
	guardarEstado ,
	obtenerEstado ,
	actualizarEstado,
	eliminarEstado,
	
}