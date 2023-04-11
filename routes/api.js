var express = require('express');
var router = express.Router();
var temp = require('../controllers/temperature.controller');
var fleet = require('../controllers/fleet-distribution.controller');

router.get('/temp-pocari', temp.temppocari);
router.get('/temp-soyjoy', temp.tempsoyjoy);
router.get('/fleet-kejayan', fleet.fleetdistribution_kejayan);
router.get('/fleet-sukabumi', fleet.fleetdistribution_sukabumi);

module.exports = router;
