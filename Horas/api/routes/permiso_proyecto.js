'use strict'

var express = require('express');
var PermisoProyectoController = require ('../controller/permiso_proyecto');

var api = express.Router();
var md_auth = require('../middleware/authenticated');

var multipart = require('connect-multiparty');
//var md_upload = multipart({uploadDir:'./uploads/users'});




api.get('/permiso-de-proyecto/:proyecto',md_auth.ensureAuth,PermisoProyectoController.obtenerPermisosDeProyecto);
api.get('/permiso-de-usuario/:usuario',md_auth.ensureAuth,PermisoProyectoController.obtenerPermisosDeUsuario);
api.put('/actualizar-permisos/:id',md_auth.ensureAuth,PermisoProyectoController.actualizarPermiso);
api.delete('/eliminar-permisos/:id',md_auth.ensureAuth,PermisoProyectoController.eliminarPermisoProyecto);
api.post('/guardar-permisos',PermisoProyectoController.guardarPermiso);


module.exports = api;