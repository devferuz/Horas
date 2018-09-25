'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProyectoSchema = Schema({


	
		cod_proyecto:String,
		nombre:String,
		descripcion:String,
		jefe_proyecto:{type: Schema.ObjectId, ref:'Usuario'},
		estado:String,
		tipo:String,
		area:String,
		sector:String
	
		
	
	

});

module.exports = mongoose.model('Proyecto',ProyectoSchema);