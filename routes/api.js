var express = require('express');
var router = express.Router();
var temp = require('../controllers/temperature.controller');
var fleet = require('../controllers/fleet-distribution.controller');
var whs = require('../controllers/warehouse.controller');

router.get('/temp-pocari', temp.temppocari);
router.get('/temp-soyjoy', temp.tempsoyjoy);

router.get('/fleet-kjy', fleet.fleetdistribution_kejayan);
router.get('/fleet-skb', fleet.fleetdistribution_sukabumi);

router.get('/month-kjy', fleet.monthly_kjy);
router.get('/month-skb', fleet.monthly_skb);

router.get('/warehouse-occu', whs.warehouse_occu);


module.exports = router;
