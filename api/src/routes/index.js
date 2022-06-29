const { Router } = require('express');
const router = Router();

const recipesRouter = require('./recipes.js');
const dietsRouter = require('./diets.js');
const recipesPostRouter = require('./recipes_post.js');

// Configuración de rutas
router.use('/recipes', recipesRouter);
router.use('/diets',dietsRouter);
router.use('/recipe', recipesPostRouter);

module.exports = router;
