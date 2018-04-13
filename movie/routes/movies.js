var express = require('express');
var router = express.Router();
const {getAllMovie, addMovie, editMovie, deleteMovie} = require('../controllers/movies.controller')

/* GET users listing. */
router.get('/', getAllMovie );
router.post('/', addMovie );
router.put('/:id', editMovie );
router.delete('/:id', deleteMovie );

module.exports = router;
