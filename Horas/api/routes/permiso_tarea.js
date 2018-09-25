'use strict'

var express = require('express');
var PermisoTareaController = require ('../controller/permiso_tarea');

var api = express.Router();
var md_auth = require('../middleware/authenticated');

var multipart = require('connect-multiparty');
//var md_upload = multipart({uploadDir:'./uploads/users'});




api.get('/permiso-de-tarea/:tarea',md_auth.ensureAuth,PermisoTareaController.obtenerPermisosDeTarea);
api.get('/permiso-de-usuario/:usuario',md_auth.ensureAuth,PermisoTareaController.obtenerPermisosDeUsuario);
api.put('/actualizar-permisos/:id',md_auth.ensureAuth,PermisoTareaController.actualizarPermiso);
api.delete('/eliminar-permisos/:id',md_auth.ensureAuth,PermisoTareaController.eliminarPermisoTarea);
api.post('/guardar-permisos',PermisoTareaController.guardarPermiso);


module.exports = api;