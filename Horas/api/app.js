'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//_rutas

var usuario_routes = require('./routes/usuario');
var proyecto_routes = require('./routes/proyecto');
var tarea_routes = require('./routes/tarea');
var hora_routes = require('./routes/hora');
var seguimiento_routes = require('./routes/seguimiento');
var permiso_proyecto = require('./routes/permiso_proyecto');
var permiso_tarea = require('./routes/permiso_tarea');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Configurar cabeceras http
app.use((req,res,netx)=>{

res.header('Access-Control-Allow-Origin','*');
res.header('Access-Control-Allow-Headers','Authorization,X-API-KEY,Origin,X-Requested-With,Content-Type,Accept,Access-Control-Allow-Request-Method');
res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE');
res.header('Allow','GET,POST,OPTIONS,PUT,DELETE');


netx();

});

//Carga de rutas bases

app.use('/api',usuario_routes); 
app.use('/api',proyecto_routes); 
app.use('/api',tarea_routes); 
app.use('/api',hora_routes);
app.use('/api',seguimiento_routes);
app.use('/api',permiso_proyecto);
app.use('/api',permiso_tarea);

module.exports = app;