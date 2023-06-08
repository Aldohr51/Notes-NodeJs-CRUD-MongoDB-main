/* enrutador de Express que define varias rutas para el "dashboard" (tablero) 
de notas de un usuario. */
const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/checkAuth');
const dashboardController = require('../controllers/dashboardController');

// Rutas del tablero de notas
router.get('/dashboard', isLoggedIn, dashboardController.dashboard); // Ruta para mostrar el tablero de notas
router.get('/dashboard/item/:id', isLoggedIn, dashboardController.dashboardViewNote); // Ruta para ver una nota específica
router.put('/dashboard/item/:id', isLoggedIn, dashboardController.dashboardUpdateNote); // Ruta para actualizar una nota específica
router.delete('/dashboard/item-delete/:id', isLoggedIn, dashboardController.dashboardDeleteNote); // Ruta para eliminar una nota específica
router.get('/dashboard/add', isLoggedIn, dashboardController.dashboardAddNote); // Ruta para mostrar el formulario de agregar una nueva nota
router.post('/dashboard/add', isLoggedIn, dashboardController.dashboardAddNoteSubmit); // Ruta para agregar una nueva nota
router.get('/dashboard/search', isLoggedIn, dashboardController.dashboardSearch); // Ruta para mostrar el formulario de búsqueda
router.post('/dashboard/search', isLoggedIn, dashboardController.dashboardSearchSubmit); // Ruta para buscar notas

module.exports = router;
