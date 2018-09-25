'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PermisoProyectoSchema = Schema({

		proyecto:{type:Schema.ObjectId,ref:'Proyecto'},
		usuario:{type:Schema.ObjectId,ref:'Usuario'},
		lectura:Boolean,
		escritura:Boolean
	
		
		
	
	

});

module.exports = mongoose.model('PermisoProyecto',PermisoProyectoSchema);