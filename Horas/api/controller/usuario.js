'use strict'
var bcrypt = require('bcrypt-nodejs');					/****************** Declaraciones ********************/
var Usuario = require('../models/usuario');				/*** En esta seccion se  declaran las importaciones***/
var jwt = require('../services/jwt');					/*** necesarias para el funcionamiento             ***/
var fs = require('fs');				                        /*****************************************************/
var path = require('path');




function loginUsuario(req, res) {

    var params = req.body;

    var usuario = params.usuario;
    var password = params.password;


    Usuario.findOne({usuario: usuario}, (err, usuario) => {

        if (err) {
            res.status(500).send({message: 'Error en la peticion'});

        } else {
            if (!usuario) {
                console.log(err);
            	res.status(404).send({message: 'El usuario no existe'});
                
            } else {

                //comprobar la password
                
            	  bcrypt.hash(params.password, null, null, function (error, hash) {
            		   usuario.password = hash;
            	
                
                bcrypt.compare(password, usuario.password, function (error, check) {
                      
                       console.log(check);
                    
                           
                         
                    if (check) {
                        //devolver datos del usuario logeado
                        if (params.gethash) {

                            //devolver un token de JWT
                            res.status(200).send({
                                token: jwt.createToken(usuario)

                            });

                        } else {

                            res.status(200).send({usuario});
                        }
                    } else {
                        res.status(404).send({message: 'El usuario no ha podido loguearse '+error});

                    }
                });
                
                });
            }

        }


    });

}



function guardarUsuario(req, res) {

    var usuario = new Usuario();

    var params = req.body;

   

    usuario.nombre = params.nombre;//obligatorio
    usuario.apellido = params.apellido;//obligatorio
    usuario.correo = params.correo;//obligatorio
    usuario.usuario = params.usuario;//obligatorio
    usuario.area = params.area;
    usuario.tarifa_venta = params.tarifa_venta;
    usuario.tarifa_costo = params.tarifa_costo;
    usuario.profesion = params.profesion;
    usuario.rol = params.rol;//administrador o usuario
    

    if (params.password) {
        //Encriptar password y guardar

        bcrypt.hash(params.password, null, null, function (error, hash) {
            usuario.password = hash;
            if (usuario.nombre != null && usuario.apellido != null && usuario.correo != null) {
                //guarde el usario

                usuario.save((err, usuarioStored) => {
                    if (err) {

                        res.status(500).send({message: 'Error al guardar el usuario'});

                    } else {
                       
                        if (!usuarioStored) {
                            res.status(404).send({message: 'No se ha registrado el usuario '+err});

                        } else {

                            res.status(200).send({usuario: usuarioStored});

                        }

                    }

                });
            } else {

                res.status(200).send({message: 'Introduce todos los datos'});

            }

        });
    } else {

        res.status(200).send({message: 'Introduce la Contraseña'})


    }

}


function obtenerUsuarios(req,res){
	
		
		Usuario.find().exec((err,usuarios)=>{

			if (err) {
				console.log(err);
				res.status(500).send({message:'Error en la peticion'});

			}else{
				if (!usuarios) {

					res.status(404).send({message:'No existe la tarea'});
				}else	{

						res.status(200).send({usuarios});
		        

						}

			}

		});

		}

function obtenerUsuario(req,res){
            var UsuarioId = req.params.id;
		
		Usuario.findById(UsuarioId).exec((err,usuario)=>{

			if (err) {
				console.log(err);
				res.status(500).send({message:'Error en la peticion'});

			}else{
				if (!usuario) {

					res.status(404).send({message:'No existe el usuario'});
				}else	{

						res.status(200).send({usuario});
		        

						}

			}

		});

		}



	
function actualizarUsuario(req, res) {


 var userId = req.body._id;
  var params = req.body;


 


    if (params.password ) {
        //Encriptar password y guardar

        bcrypt.hash(params.password, null, null, function (err, hash) {
            params.password = hash;
            console.log(hash);
           
                //guarde el usario

                Usuario.findByIdAndUpdate(userId, params,(err, usuarioUpdated) => {
                    if (err) {

                        res.status(500).send({message: 'Error al actualizar el usuario '+err});

                    } else {
                       
                        if (!usuarioUpdated) {
                            res.status(404).send({message: 'No se ha actualizado el usuario'});

                        } else {

                            res.status(200).send({usuario: usuarioUpdated});

                        }

                    }

                });
         

        });
    } else {

        res.status(200).send({message: 'Introduce la Contraseña'});


    }

}




function eliminarUsuario(req,res){
	
	
	   var id_usuario = req.params.id;
	

	    Usuario.findByIdAndRemove(id_usuario, (err, usuarioRemoved) => {
	        if(err) {
	            res.status(500).send({message: 'Error al eliminar el usuario'});

	        } else {

	            if(!usuarioRemoved) {

	                res.status(404).send({message: 'No se ha podido eliminar el usuario'});

	            } else {

	                res.status(200).send({user: usuarioRemoved});

	            }
	        }


	    });
	

}

module.exports ={


guardarUsuario,
obtenerUsuarios,
obtenerUsuario,
loginUsuario,
actualizarUsuario,
eliminarUsuario

}