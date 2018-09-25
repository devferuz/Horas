'use strict'

var express = require('express');
var ProyectoController = require ('../controller/proyecto');

var api = express.Router();
var md_auth = require('../middleware/authenticated');

var multipart = require('connect-multiparty');
//var md_upload = multipart({uploadDir:'./uploads/users'});




api.get('/proyectos',md_auth.ensureAuth,ProyectoController.obtenerProyectos);
api.put('/actualizar-proyecto/:id',md_auth.ensureAuth,ProyectoController.actualizarProyecto);
api.delete('/eliminar-proyecto/:id',md_auth.ensureAuth,ProyectoController.eliminarProyecto);
api.post('/guardar-proyecto',ProyectoController.guardarProyecto);
api.get('/obtener-proyecto/:id',md_auth.ensureAuth,ProyectoController.obtenerProyecto);

module.exports = api;