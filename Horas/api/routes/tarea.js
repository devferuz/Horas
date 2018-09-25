'use strict'

var express = require('express');
var TareaController = require ('../controller/tarea');

var api = express.Router();
var md_auth = require('../middleware/authenticated');

var multipart = require('connect-multiparty');
//var md_upload = multipart({uploadDir:'./uploads/users'});




api.get('/tareasporproyecto/:proyecto',md_auth.ensureAuth,TareaController.obtenerTareasPorProyecto);
api.put('/actualizar-tarea/:id',md_auth.ensureAuth,TareaController.actualizarTarea);
api.delete('/eliminar-tarea/:id',md_auth.ensureAuth,TareaController.eliminarTarea);
api.post('/guardar-tarea',TareaController.guardarTarea);
api.get('/tarea/:id',md_auth.ensureAuth,TareaController.obtenerTarea);

module.exports = api;