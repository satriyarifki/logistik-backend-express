var express = require('express');
var router = express.Router();
var temp = require('../controllers/temperature.controller');
var fleet = require('../controllers/fleet-distribution.controller');
var whs = require('../controllers/warehouse.controller');

//TEMPERATURE
router.get('/temp-pocari', temp.temppocari);
router.get('/temp-soyjoy', temp.tempsoyjoy);

//FLEET
//// GET
router.get('/fleet-kjy', fleet.fleetdistribution_kejayan);
router.get('/fleet-skb', fleet.fleetdistribution_sukabumi);
router.get('/fleet-kjy/:date', fleet.fleet_kejayan_byid);
router.get('/fleet-skb/:date', fleet.fleet_sukabumi_byid);
router.get('/fleet-kjy-all', fleet.fleet_kejayan_all);
router.get('/fleet-skb-all', fleet.fleet_sukabumi_all);
//// POST
router.post('/fleet-kjy/trucking/:id', fleet.edit_trucking_kjy);
router.post('/fleet-skb/trucking/:id', fleet.edit_trucking_kjy);
router.post('/fleet-kjy/delivery/:id', fleet.edit_delivery_kjy);
router.post('/fleet-skb/delivery/:id', fleet.edit_delivery_skb);
router.post('/fleet-kjy/ontime/:id', fleet.edit_ontime_kjy);
router.post('/fleet-skb/ontime/:id', fleet.edit_ontime_skb);
router.post('/fleet-kjy/damage/:id', fleet.edit_damage_kjy);
router.post('/fleet-skb/damage/:id', fleet.edit_damage_skb);
router.post('/fleet-kjy/perfect/:id', fleet.edit_perfect_kjy);
router.post('/fleet-skb/perfect/:id', fleet.edit_perfect_skb);
router.post('/fleet-kjy/handling/:id', fleet.edit_handling_kjy);
router.post('/fleet-skb/handling/:id', fleet.edit_handling_skb);



router.get('/month-kjy', fleet.monthly_kjy);
router.get('/month-skb', fleet.monthly_skb);

router.get('/warehouse-occu', whs.warehouse_occu);
router.get('/warehouse-occu-all', whs.warehouse_occu);


module.exports = router;
