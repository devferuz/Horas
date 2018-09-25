'use strict'

var express = require('express');
var HoraController = require ('../controller/hora');

var api = express.Router();
var md_auth = require('../middleware/authenticated');

var multipart = require('connect-multiparty');
//var md_upload = multipart({uploadDir:'./uploads/users'});




api.get('/horas-usuario/:usuario',md_auth.ensureAuth,HoraController.obtenerHorasPorUsuario);
api.put('/actualizar-hora/:id',md_auth.ensureAuth,HoraController.actualizarHora);
api.delete('/eliminar-hora/:id',md_auth.ensureAuth,HoraController.eliminarHora);
api.post('/registrar-hora',HoraController.registrarHoras);


module.exports = api;