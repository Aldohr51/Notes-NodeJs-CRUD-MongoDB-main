/*importa Express y crea una instancia de Router. Luego, 
importa el controlador principal y define dos rutas para la página
 de inicio y la página "Acerca de". 
Finalmente, exporta el enrutador para ser utilizado en la aplicación principal.*/

// Importar Express y crear una instancia de Router
const express = require('express');
const router = express.Router();

// Importar el controlador principal
const mainController = require('../controllers/mainController');

/**
 * Definir las rutas de la aplicación
*/

// Ruta de la página de inicio
router.get('/', mainController.homepage);

// Ruta de la página "Acerca de"
router.get('/about', mainController.about);

// Exportar el router
module.exports = router;
