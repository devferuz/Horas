'use strict'

var express = require('express');
var SeguimientoController = require ('../controller/seguimiento');

var api = express.Router();
var md_auth = require('../middleware/authenticated');

var multipart = require('connect-multiparty');
//var md_upload = multipart({uploadDir:'./uploads/users'});




api.get('/estado-proyecto/:proyecto',md_auth.ensureAuth,SeguimientoController.obtenerEstado);
api.put('/actualizar-estado/:id',md_auth.ensureAuth,SeguimientoController.actualizarEstado);
api.delete('/eliminar-estado/:id',md_auth.ensureAuth,SeguimientoController.eliminarEstado);
api.post('/guardar-estado',SeguimientoController.guardarEstado);


module.exports = api;