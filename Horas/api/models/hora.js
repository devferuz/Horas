'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HoraSchema = Schema({


	
		usuario:{type:Schema.ObjectId, ref:'Usuario'},
		proyecto:{type:Schema.ObjectId, ref:'Proyecto'},
		tarea:{type:Schema.ObjectId, ref:'Tarea'},
		fecha_tarea:Date,
		fecha_registro:Date,
		cantidad_horas:Number
		
	
	

});

module.exports = mongoose.model('Hora',HoraSchema);