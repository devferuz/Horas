'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TareaSchema = Schema({


		cod_tarea:String,
		proyecto:{type: Schema.ObjectId, ref:'Proyecto'},
		nombre:String,
		descripcion:String,
		max_horas:Number,
		estado:String
	
		
	
	

});

module.exports = mongoose.model('Tarea',TareaSchema);