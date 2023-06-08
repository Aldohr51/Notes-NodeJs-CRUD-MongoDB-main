/*Define un módulo de rutas en Express que maneja la autenticación de usuarios 
con la estrategia de autenticación de Google OAuth 2.0. 
El módulo utiliza el middleware de 
Passport.js para manejar la autenticación y el almacenamiento de sesión.*/

const express = require("express");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

// Configuración de estrategia de autenticación de Passport para Google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      // Crear un nuevo usuario basado en la información de perfil de Google
      const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        profileImage: profile.photos[0].value,
      };

      try {
        // Buscar al usuario por su ID de Google en la base de datos
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          // Si el usuario existe, retornarlo
          done(null, user);
        } else {
          // Si no existe, crear un nuevo usuario y retornarlo
          user = await User.create(newUser);
          done(null, user);
        }
      } catch (error) {
        console.log(error);
      }
    }
  )
);

// Ruta de inicio de sesión de Google
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// Recuperar datos del usuario
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login-failure",
    successRedirect: "/dashboard",
  })
);

// Ruta si algo va mal
router.get('/login-failure', (req, res) => {
  res.send('Something went wrong...');
});

// Destruir sesión de usuario
router.get('/logout', (req, res) => {
  // Destruir la sesión del usuario y redirigir a la página de inicio
  req.session.destroy(error => {
    if(error) {
      console.log(error);
      res.send('Error loggin out');
    } else {
      res.redirect('/')
    }
  })
});

// Conservar los datos del usuario tras una autenticación correcta
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Recuperar datos de usuario de la sesión.
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

module.exports = router;
