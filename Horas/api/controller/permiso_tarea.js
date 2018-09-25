'use strict'
var bcrypt = require('bcrypt-nodejs'); 												/****************** Declaraciones ********************/
var Permiso_tarea = require('../models/permiso_tarea');			 				    /*** En esta seccion se  declaran las importaciones***/
var jwt = require('../services/jwt'); 												/*** necesarias para el funcionamiento             ***/
var fs = require('fs'); 															/*****************************************************/
var path = require('path');




function guardarPermiso(req, res) {
	var permiso = new Permiso();

	var params = req.body;



	permiso.tarea = params.tarea;
	permiso.usuario= params.usuario;
	permiso.lectura= params.lectura;
	permiso.escritura=params.escritura;
	
	


	permiso.save((err, permisoStored) => {
		if (err) {

			res.status(500).send({
				message : 'Error al registrar permiso'
			});

		} else {

			if (!permisoStored) {
				res.status(404).send({
					message : 'No se han registrado el permiso'
				});

			} else {

				res.status(200).send({
					Permiso : permisoStored
				});

			}

		}

	});


}


function obtenerPermisosDeTarea(req, res) {
	
	var tarea = req.params.tarea;
	
	Permiso_tarea.find({'tarea':tarea}).populate({path : 'tarea'}).exec((err, permiso_tarea) => {

		if (err) {
			console.log(err);
			res.status(500).send({
				message : 'Error en la peticion'
			});

		} else {
			if (!permiso_tarea) {

				res.status(404).send({
					message : 'No existen permisos asociados a la tarea'
				});
			} else {

				res.status(200).send({
					permiso_tarea
				});


			}

		}

	});

}

function obtenerPermisosDeUsuario(req, res) {
	
	var usuario = req.params.usuario;
	
	Permiso_tarea.find({'usuario':usuario}).populate({path : 'usuario'}).exec((err, permiso_usuario) => {

		if (err) {
			console.log(err);
			res.status(500).send({
				message : 'Error en la peticion'
			});

		} else {
			if (!permiso_usuario) {

				res.status(404).send({
					message : 'No existen permisos asociados al usuario'
				});
			} else {

				res.status(200).send({
					permiso_usuario
				});


			}

		}

	});

}




function actualizarPermiso(req, res) {
	var id_permiso_tarea = req.params.id;
	var update = req.body;

	Permiso_tarea.findbyIdAndUpdate(id_permiso_tarea, update, (err, PermisoTareaUpdated) => {
		if (err) {
			res.status(500).send({
				message : 'Error al actualizar el permiso'
			});

		} else {

			if (!PermisoTareaUpdated) {

				res.status(404).send({
					message : 'No se ha podido actualizar el permiso'
				});

			} else {

				res.status(200).send({
					Tarea : PermisoTareaUpdated
				});

			}
		}


	});

}

function eliminarPermisoTarea(req, res) {
	var id_permiso_tarea = req.params.id;


	Permiso_tarea.findbyIdAndRemove(id_permiso_tarea, (err, PermisoTareaRemoved) => {
		if (err) {
			res.status(500).send({
				message : 'Error al eliminar el permiso'
			});

		} else {

			if (!PermisoTareaRemoved) {

				res.status(404).send({
					message : 'No se ha podido eliminar el permiso'
				});

			} else {

				res.status(200).send({
					Permiso : PermisoTareaRemoved
				});

			}
		}


	});


}

module.exports = {
	guardarPermiso,
	obtenerPermisosDeTarea,
	obtenerPermisosDeUsuario,
	actualizarPermiso,
	eliminarPermisoTarea

}