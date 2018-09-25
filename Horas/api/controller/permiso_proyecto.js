'use strict'
var bcrypt = require('bcrypt-nodejs'); 												/****************** Declaraciones ********************/
var Permiso_Proyecto = require('../models/permiso_proyecto');	 				    /*** En esta seccion se  declaran las importaciones***/
var jwt = require('../services/jwt'); 												/*** necesarias para el funcionamiento             ***/
var fs = require('fs'); 															/*****************************************************/
var path = require('path');




function guardarPermiso(req, res) {
	var permiso = new Permiso();

	var params = req.body;



	permiso.proyecto = params.proyecto;
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


function obtenerPermisosDeProyecto(req, res) {
	
	var proyecto = req.params.proyecto;
	
	Permiso_Proyecto.find({'proyecto':proyecto}).populate({path : 'proyecto'}).exec((err, permiso_proyecto) => {

		if (err) {
			console.log(err);
			res.status(500).send({
				message : 'Error en la peticion'
			});

		} else {
			if (!permiso_proyecto) {

				res.status(404).send({
					message : 'No existen permisos asociados al proyecto'
				});
			} else {

				res.status(200).send({
					permiso_proyecto
				});


			}

		}

	});

}

function obtenerPermisosDeUsuario(req, res) {
	
	var usuario = req.params.usuario;
	
	Permiso_Proyecto.find({'usuario':usuario}).populate({path : 'usuario'}).exec((err, permiso_usuario) => {

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
	var id_permiso_proyecto = req.params.id;
	var update = req.body;

	Permiso_Proyecto.findbyIdAndUpdate(id_permiso_proyecto, update, (err, PermisoProyectoUpdated) => {
		if (err) {
			res.status(500).send({
				message : 'Error al actualizar el permiso'
			});

		} else {

			if (!PermisoProyectoUpdated) {

				res.status(404).send({
					message : 'No se ha podido actualizar el permiso'
				});

			} else {

				res.status(200).send({
					user : PermisoProyectoUpdated
				});

			}
		}


	});

}

function eliminarPermisoProyecto(req, res) {
	var id_permiso_proyecto = req.params.id;


	Permiso_Proyecto.findbyIdAndRemove(id_permiso_proyecto, (err, PermisoProyectoRemoved) => {
		if (err) {
			res.status(500).send({
				message : 'Error al eliminar el permiso'
			});

		} else {

			if (!PermisoProyectoRemoved) {

				res.status(404).send({
					message : 'No se ha podido eliminar el permiso'
				});

			} else {

				res.status(200).send({
					Permiso : PermisoProyectoRemoved
				});

			}
		}


	});


}

module.exports = {
	guardarPermiso,
	obtenerPermisosDeProyecto,
	obtenerPermisosDeUsuario,
	actualizarPermiso,
	eliminarPermisoProyecto

}