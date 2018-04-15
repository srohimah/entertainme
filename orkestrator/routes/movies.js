const express = require('express');
const router = express.Router();
const {
  addMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movies.controller')

router.post('/', addMovie)
router.put('/:id', updateMovie)
router.delete('/:id', deleteMovie)

module.exports = router;