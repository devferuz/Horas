'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SeguimientoSchema = Schema({

	
		proyecto:{type:Schema.ObjectId, ref:'Proyecto'},
		descripcion:String,
		fecha_inicio:Date,
		fecha_termino:Date,
		responsable:{type:Schema.ObjectId, ref:'Usuario'},
		estado:String
		
	
	

});

module.exports = mongoose.model('Seguimiento',SeguimientoSchema);