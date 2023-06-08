/* */
const Note = require("../models/Notes"); // Importa el modelo Note
const mongoose = require("mongoose"); // Importa Mongoose

/**
 * GET /
 * Dashboard
 */
exports.dashboard = async (req, res) => {

  let perPage = 12; // Número de notas por página
  let page = req.query.page || 1; // La página actual se establece en "page" o predeterminado en 1 si no se proporciona

  const locals = { // Definición de variables locales que se pueden utilizar en las plantillas
    title: "Dashboard",
    description: "Free NodeJS Notes App.",
  };

  try {
    // Mongoose "^7.0.0 Update
    // Aggrega las notas del usuario actual y las ordena por fecha de actualización
    // Proyecta solo los primeros 30 caracteres del título y los primeros 100 caracteres del cuerpo
    const notes = await Note.aggregate([
      { $sort: { updatedAt: -1 } },
      { $match: { user: mongoose.Types.ObjectId(req.user.id) } },
      {
        $project: {
          title: { $substr: ["$title", 0, 30] },
          body: { $substr: ["$body", 0, 100] },
        },
      }
      ])
    .skip(perPage * page - perPage) // Saltar las notas en páginas anteriores
    .limit(perPage) // Limitar las notas por página
    .exec(); 

    const count = await Note.count(); // Obtener el número total de notas

    // Renderiza la vista dashboard/index y pasa las variables locales, las notas actuales, la página actual y el número total de páginas.
    res.render('dashboard/index', {
      userName: req.user.firstName, // Nombre del usuario
      locals,
      notes,
      layout: "../views/layouts/dashboard", // Plantilla de diseño
      current: page,
      pages: Math.ceil(count / perPage) // Número total de páginas
    });

  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * View Specific Note
 */
exports.dashboardViewNote = async (req, res) => {
  // Encuentra una nota específica por su ID y el ID del usuario actual.
  const note = await Note.findById({ _id: req.params.id })
    .where({ user: req.user.id })
    .lean();

  if (note) {
    // Si la nota existe, renderiza la vista dashboard/view-note y pasa el ID de la nota y la nota como variables.
    res.render("dashboard/view-note", {
      noteID: req.params.id,
      note,
      layout: "../views/layouts/dashboard",
    });
  } else {
    // Si la nota no existe, devuelve un mensaje de error.
    res.send("Something went wrong.");
  }
};

/**
 * PUT /
 * Update Specific Note
 */
exports.dashboardUpdateNote = async (req, res) => {
  try {
    // Encuentra y actualiza una nota específica por su ID y el ID del usuario actual.
    await Note.findOneAndUpdate(
      { _id: req.params.id },
      { title: req.body.title, body: req.body.body, updatedAt: Date.now() }
    ).where({ user: req.user.id });
    res.redirect("/dashboard"); // Redirecciona a la página del dashboard
  } catch (error) {
    console
.log(error);
  }
};

/**
 * DELETE /
 * Delete Note
 */
exports.dashboardDeleteNote = async (req, res) => {
  try {
    await Note.deleteOne({ _id: req.params.id }).where({ user: req.user.id });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Add Notes
 */
exports.dashboardAddNote = async (req, res) => {
  res.render("dashboard/add", {
    layout: "../views/layouts/dashboard",
  });
};

/**
 * POST /
 * Add Notes
 */
exports.dashboardAddNoteSubmit = async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Note.create(req.body);
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Search
 */
exports.dashboardSearch = async (req, res) => {
  try {
    res.render("dashboard/search", {
      searchResults: "",
      layout: "../views/layouts/dashboard",
    });
  } catch (error) {}
};

/**
 * POST /
 * Search For Notes
 */
exports.dashboardSearchSubmit = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const searchResults = await Note.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChars, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChars, "i") } },
      ],
    }).where({ user: req.user.id });

    res.render("dashboard/search", {
      searchResults,
      layout: "../views/layouts/dashboard",
    });
  } catch (error) {
    console.log(error);
  }
};
