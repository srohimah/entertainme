const express = require('express');
const router = express.Router();
const {getEntertains} = require('../controllers/entertain.controller')
const movies = require('./movies')
const series = require('./series')
const {checkEntertainmeCache} = require('../middlewares/cache')

// router.get('/',getEntertains);
router.get('/',checkEntertainmeCache, getEntertains);
router.use('/movies', movies)
router.use('/series', series)

module.exports = router;
