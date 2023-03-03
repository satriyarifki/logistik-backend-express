var express = require('express');
var router = express.Router();
var temp = require('../controllers/temperature.controller');

router.get('/temp-pocari', temp.temppocari);
router.get('/temp-soyjoy', temp.tempsoyjoy);

module.exports = router;
