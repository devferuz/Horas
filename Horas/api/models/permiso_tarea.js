'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PermisoTareaSchema = Schema({

		tarea:{type:Schema.ObjectId,ref:'Tarea'},
		usuario:{type:Schema.ObjectId,ref:'Usuario'},
		lectura:Boolean,
		escritura:Boolean
	
		
		
	
	

});

module.exports = mongoose.model('PermisoTarea',PermisoTareaSchema);