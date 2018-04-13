var express = require('express');
var router = express.Router();
const {getAllTvSeries, addTvSeries, editTvSeries, deleteTvSeries} = require('../controllers/tvseries.controller')

/* GET users listing. */
router.get('/', getAllTvSeries );
router.post('/', addTvSeries );
router.put('/:id', editTvSeries );
router.delete('/:id', deleteTvSeries );

module.exports = router;
