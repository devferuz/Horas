'use strict'
var bcrypt = require('bcrypt-nodejs'); 						/****************** Declaraciones ********************/
var Hora = require('../models/hora');	 				    /*** En esta seccion se  declaran las importaciones***/
var jwt = require('../services/jwt'); 						/*** necesarias para el funcionamiento             ***/
var fs = require('fs'); 									/*****************************************************/
var path = require('path');




function registrarHoras(req, res) {
	var hora = new Hora();

	var params = req.body;



	
	hora.usuario = params.usuario;
	hora.proyecto = params.proyecto;
	hora.tarea = params.tarea;
	hora.fecha_tarea = params.fecha_tarea; // revisar con funciones moment.js
	hora.fecha_registro = params.fecha_registro;
	hora.cantidad_horas = params.cantidad_horas;


	hora.save((err, horaStored) => {
		if (err) {

			res.status(500).send({
				message : 'Error al registrar las horas'
			});

		} else {

			if (!horaStored) {
				res.status(404).send({
					message : 'No se han registrado las horas'
				});

			} else {

				res.status(200).send({
					Registro : horaStored
				});

			}

		}

	});


}


function obtenerHorasPorUsuario(req, res) {
	
	var usuario = req.params.usuario;
	
	hora.find({'usuario':usuario}).populate({
		path : 'usuario'
	}).exec((err, hora) => {

		if (err) {
			console.log(err);
			res.status(500).send({
				message : 'Error en la peticion'
			});

		} else {
			if (!hora) {

				res.status(404).send({
					message : 'No existen horas asociadas al proyecto'
				});
			} else {

				res.status(200).send({
					hora
				});


			}

		}

	});

}




function actualizarHora(req, res) {
	var id_hora = req.params.id;
	var update = req.body;

	Tarea.findbyIdAndUpdate(id_hora, update, (err, horaUpdated) => {
		if (err) {
			res.status(500).send({
				message : 'Error al actualizar hora'
			});

		} else {

			if (!horaUpdated) {

				res.status(404).send({
					message : 'No se ha podido actualizar hora'
				});

			} else {

				res.status(200).send({
					user : horaUpdated
				});

			}
		}


	});

}

function eliminarHora(req, res) {
	var id_hora = req.params.id;


	Tarea.findbyIdAndRemove(id_hora, (err, horaRemoved) => {
		if (err) {
			res.status(500).send({
				message : 'Error al eliminar la hora'
			});

		} else {

			if (!horaRemoved) {

				res.status(404).send({
					message : 'No se ha podido eliminar la hora'
				});

			} else {

				res.status(200).send({
					tarea : horaRemoved
				});

			}
		}


	});


}

module.exports = {
    registrarHoras,
    obtenerHorasPorUsuario,
    actualizarHora,
    eliminarHora

}