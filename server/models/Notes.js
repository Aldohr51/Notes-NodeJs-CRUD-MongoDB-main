// Importamos la librería mongoose
const mongoose = require('mongoose');

// Creamos un objeto Schema que permite definir la estructura de una colección en MongoDB
const Schema = mongoose.Schema;

// Definimos la estructura del modelo para las notas
const NoteSchema = new Schema({
  user: {
    type: Schema.ObjectId,  // El tipo de datos que almacena ObjectId
    ref: 'User'             // La referencia a la colección Users
  },
  title: {
    type: String,           // El tipo de datos que almacena un string
    required: true,         // Indica que este campo es obligatorio
  },
  body: {
    type: String,           // El tipo de datos que almacena un string
    required: true,         // Indica que este campo es obligatorio
  },
  createdAt: {
    type: Date,             // El tipo de datos que almacena una fecha
    default: Date.now()     // Valor por defecto: la fecha actual
  },
  updatedAt: {
    type: Date,             // El tipo de datos que almacena una fecha
    default: Date.now()     // Valor por defecto: la fecha actual
  }
});

// Exportamos el modelo 'Note' que se basa en el esquema definido anteriormente
module.exports = mongoose.model('Note', NoteSchema);
