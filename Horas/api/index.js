'use strict'

var mongoose = require ('mongoose');

var app = require('./app');
var port =3978;
//cambiar ip al implementar en servidor
mongoose.connect('mongodb://192.168.0.74:27017/horas',{ useNewUrlParser: true },(err,res)=>{

	if(err){

			throw err;

	}else{

		console.log("la BD esta corriendo correctamente...");

		app.listen(port, function(){

				console.log("servidor del api rest de Horas EDIC escuchando en http://192.168.0.74:"+port);

		})
	}

});
