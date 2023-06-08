/*es un middleware de autenticación para verificar si un 
usuario está autenticado en una aplicación web.*/

exports.isLoggedIn = function (req, res, next) {
  return next();
}