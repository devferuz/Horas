'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({


	
		nombre:String,
		apellido:String,
		correo:String,
		usuario:String,
		password:String,
		area:String,
		tarifa_venta:Number,
		tarifa_costo:Number,
		profesion:String,
		rol:String
		
	
	

});

module.exports = mongoose.model('Usuario',UsuarioSchema);