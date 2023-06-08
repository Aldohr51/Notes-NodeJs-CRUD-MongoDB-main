// Importamos el módulo mongoose
const mongoose = require('mongoose');

// Creamos una instancia de Schema de mongoose
const Schema = mongoose.Schema;

// Creamos el schema de User
const UserSchema = new Schema({
  googleId: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  profileImage: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Exportamos el modelo User con el schema creado
module.exports = mongoose.model('User', UserSchema);
