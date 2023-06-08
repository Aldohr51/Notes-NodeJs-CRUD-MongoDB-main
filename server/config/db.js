// Importamos la librería mongoose
const mongoose = require('mongoose');
// Configuramos una opción para permitir querys sin especificar todos los campos
mongoose.set('strictQuery', false);

// Creamos una función asíncrona para conectarnos a la base de datos
const connectDB = async() => {
  try {
    // Utilizamos el método connect de mongoose para conectarnos a la base de datos.
    // El parámetro es la URL de conexión a la base de datos, que está almacenada en una variable de entorno.
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    // Si la conexión es exitosa, imprimimos un mensaje en la consola con el host de la conexión.
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    // Si hay algún error en la conexión, lo capturamos y lo imprimimos en la consola.
    console.log(error);
  }
}

// Exportamos la función connectDB para poder utilizarla en otros archivos.
module.exports = connectDB;

