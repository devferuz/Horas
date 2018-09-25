'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
var secret ='edicsa81sc';

exports.createToken = function(user){

	var payload = {

		sub: user._id,
		nombre: user.nombre,
		apellido: user.apellido,
		mail: user.mail,
		rol: user.rol,
		iat: moment().unix(),
		exp: moment().add(30,'days').unix

	};

	return jwt.encode(payload, secret);


};