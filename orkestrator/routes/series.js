const express = require('express');
const router = express.Router();
const {
  addSeries,
  updateSeries,
  deleteSeries
} = require('../controllers/tvseries.controller')

router.post('/', addSeries)
router.put('/:id', updateSeries)
router.delete('/:id', deleteSeries)

module.exports = router;