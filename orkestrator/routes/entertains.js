var express = require('express');
var router = express.Router();
const {getEntertains} = require('../controllers/entertain.controller')

/* GET users listing. */
router.get('/', getEntertains);

module.exports = router;
