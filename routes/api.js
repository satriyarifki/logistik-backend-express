var express = require('express');
var router = express.Router();
var temp = require('../controllers/temperature.controller');
var fleet = require('../controllers/fleet-distribution.controller');
var whs = require('../controllers/warehouse.controller');
var ln2 = require('../controllers/check-ln2.controller');
var rmpm = require('../controllers/rmpm.controller');

//TEMPERATURE
router.get('/temp-pocari', temp.temppocari);
router.get('/temp-soyjoy', temp.tempsoyjoy);

//FLEET
//// GET
router.get('/fleet-kjy', fleet.fleetdistribution_kejayan);
router.get('/fleet-skb', fleet.fleetdistribution_sukabumi);
router.get('/fleet-kjy/:id', fleet.fleet_kejayan_byid);
router.get('/fleet-skb/:id', fleet.fleet_sukabumi_byid);
router.get('/fleet-kjy-all', fleet.fleet_kejayan_all);
router.get('/fleet-skb-all', fleet.fleet_sukabumi_all);
//// POST
router.post('/fleet-kjy/trucking/:id', fleet.edit_trucking_kjy);
router.post('/fleet-skb/trucking/:id', fleet.edit_trucking_skb);
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
router.get('/warehouse-occu-date/:date', whs.warehouse_occu_bydate);
router.get('/warehouse-occu/:id', whs.warehouse_occu_byid);
router.get('/warehouse-occu-all', whs.warehouse_occu_all);
router.post('/warehouse-occu-update/:id', whs.edit_occupancy);

router.get('/arrival-ln2/:id', ln2.arrival_byId)
router.get('/arrival-ln2', ln2.arrival_all)
router.get('/check-level/newest', ln2.newest_check_level)
router.get('/pengisian-ln2/:id', ln2.pengisian_byArrivalId)
router.get('/report-ln2/:date', ln2.view_report_ln2)
router.get('/ln2-karyawan', ln2.karyawan)
router.get('/ln2-supplier', ln2.supplier)
router.get('/ln2-tanki', ln2.tanki)
router.post('/arrival-create',ln2.arrival_create)
router.post('/arrival-edit/:id',ln2.arrival_update)
router.post('/arrival-create/air',ln2.arrival_air_create)
router.post('/fill-ln2/edit/:id',ln2.arrival_air_update)
router.post('/level-ln2',ln2.check_level_create)
router.delete('/del/arrival/:id',ln2.arrival_air_delete)

//RMPM Occupancy
router.get('/rmpm-view', rmpm.index_view)
router.get('/rmpm/storage', rmpm.storage)


module.exports = router;
