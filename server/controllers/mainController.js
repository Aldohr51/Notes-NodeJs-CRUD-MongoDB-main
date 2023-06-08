/**
 * GET /
 * Homepage 
*/
exports.homepage = async (req, res) => {
  // Definir el objeto locals con los detalles de la página
  const locals = {
    title: "NodeJs Notes", // Título de la página
    description: "Free NodeJS Notes App.", // Descripción de la página
  }

  // Renderizar la vista 'index' con la plantilla 'front-page' y el objeto locals
  res.render('index', {
    locals, // Objeto locals
    layout: '../views/layouts/front-page' // Diseño a utilizar
  });
}


/**
 * GET /
 * About 
*/
exports.about = async (req, res) => {
  // Definir el objeto locals con los detalles de la página
  const locals = {
    title: "About - NodeJs Notes", // Título de la página
    description: "Free NodeJS Notes App.", // Descripción de la página
  }

  // Renderizar la vista 'about' con el objeto locals
  res.render('about', locals);
} 
