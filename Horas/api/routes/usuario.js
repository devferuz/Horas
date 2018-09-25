'use strict'

var express = require('express');
var UsuarioController = require ('../controller/usuario');

var api = express.Router();
var md_auth = require('../middleware/authenticated');

var multipart = require('connect-multiparty');
//var md_upload = multipart({uploadDir:'./uploads/users'});



api.post('/registrar',UsuarioController.guardarUsuario);
api.get('/usuarios',md_auth.ensureAuth,UsuarioController.obtenerUsuarios);
api.get('/usuario/:id',md_auth.ensureAuth,UsuarioController.obtenerUsuario);
api.post('/login',UsuarioController.loginUsuario);
api.post('/actualizar-usuario/:id',md_auth.ensureAuth,UsuarioController.actualizarUsuario);
api.delete('/eliminar-usuario/:id',md_auth.ensureAuth,UsuarioController.eliminarUsuario);

module.exports = api;