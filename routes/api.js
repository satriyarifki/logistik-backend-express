var express = require('express');
var router = express.Router();
var temp = require('../controllers/temperature.controller');
var fleet = require('../controllers/fleet-distribution.controller');
var whs = require('../controllers/warehouse.controller');

router.get('/temp-pocari', temp.temppocari);
router.get('/temp-soyjoy', temp.tempsoyjoy);

router.get('/fleet-kjy', fleet.fleetdistribution_kejayan);
router.get('/fleet-skb', fleet.fleetdistribution_sukabumi);
router.get('/fleet-kjy/:date', fleet.fleet_kejayan_byid);
router.get('/fleet-skb/:date', fleet.fleet_sukabumi_byid);
router.get('/fleet-kjy-all', fleet.fleet_kejayan_all);
router.get('/fleet-skb-all', fleet.fleet_sukabumi_all);

router.get('/month-kjy', fleet.monthly_kjy);
router.get('/month-skb', fleet.monthly_skb);

router.get('/warehouse-occu', whs.warehouse_occu);
router.get('/warehouse-occu-all', whs.warehouse_occu);


module.exports = router;
