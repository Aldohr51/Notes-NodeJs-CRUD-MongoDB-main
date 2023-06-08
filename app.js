/*Configuración básica de una aplicación web con Express. 
Primero se importan los módulos necesarios, incluyendo Express, EJS para el motor de plantillas, 
método override para permitir el uso de PUT y DELETE en formularios HTML, y las dependencias
 necesarias para el manejo de sesiones y autenticación con Passport.*/

// Carga las variables de entorno desde un archivo .env
require('dotenv').config();

// Importa las librerías y módulos necesarios
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require("method-override");
const connectDB = require('./server/config/db');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');

const app = express();
const port = 5000 || process.env.PORT;

// Configuración de la sesión y la persistencia de la misma en la base de datos
app.use(session({
  secret: 'keyboard cat', // Secreto para firmar la sesión
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ // Almacenamiento de la sesión en MongoDB
    mongoUrl: process.env.MONGODB_URI // URL de conexión a MongoDB
  }),
  //cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
  // Date.now() - 30 * 24 * 60 * 60 * 1000
}));

// Configuración de Passport para la autenticación
app.use(passport.initialize());
app.use(passport.session());

// Configuración de body-parser para parsear los datos de las peticiones HTTP
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Configuración de method-override para poder usar PUT y DELETE en las peticiones HTTP
app.use(methodOverride("_method"));

// Conexión a la base de datos MongoDB
connectDB();  

// Archivos estáticos
app.use(express.static('public'));

// Configuración del motor de plantillas EJS
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Rutas
app.use('/', require('./server/routes/auth'));
app.use('/', require('./server/routes/index'));
app.use('/', require('./server/routes/dashboard'));

// Manejo del error 404
app.get('*', function(req, res) {
  //res.status(404).send('404 Page Not Found.')
  res.status(404).render('404');
})

// Inicia la aplicación en el puerto indicado
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
