var express = require("express");
var router = express.Router();
var temp = require("../controllers/temperature.controller");
var fleet = require("../controllers/fleet-distribution.controller");
var whs = require("../controllers/warehouse.controller");
var ln2 = require("../controllers/check-ln2.controller");
var rmpm = require("../controllers/rmpm.controller");
var budget = require("../controllers/budget-factory.controller");

//TEMPERATURE
router.get("/temp-pocari", temp.temppocari);
router.get("/temp-soyjoy", temp.tempsoyjoy);

// FLEET
//// GET
router.get("/fleet-kjy", fleet.fleetdistribution_kejayan);
router.get("/fleet-skb", fleet.fleetdistribution_sukabumi);
router.get("/fleet-kjy/:id", fleet.fleet_kejayan_byid);
router.get("/fleet-skb/:id", fleet.fleet_sukabumi_byid);
router.get("/fleet-kjy-all", fleet.fleet_kejayan_all);
router.get("/fleet-skb-all", fleet.fleet_sukabumi_all);
router.get("/month-kjy", fleet.monthly_kjy);
router.get("/month-skb", fleet.monthly_skb);
//// POST
router.post("/fleet-kjy/trucking/:id", fleet.edit_trucking_kjy);
router.post("/fleet-skb/trucking/:id", fleet.edit_trucking_skb);
router.post("/fleet-kjy/delivery/:id", fleet.edit_delivery_kjy);
router.post("/fleet-skb/delivery/:id", fleet.edit_delivery_skb);
router.post("/fleet-kjy/ontime/:id", fleet.edit_ontime_kjy);
router.post("/fleet-skb/ontime/:id", fleet.edit_ontime_skb);
router.post("/fleet-kjy/damage/:id", fleet.edit_damage_kjy);
router.post("/fleet-skb/damage/:id", fleet.edit_damage_skb);
router.post("/fleet-kjy/perfect/:id", fleet.edit_perfect_kjy);
router.post("/fleet-skb/perfect/:id", fleet.edit_perfect_skb);
router.post("/fleet-kjy/handling/:id", fleet.edit_handling_kjy);
router.post("/fleet-skb/handling/:id", fleet.edit_handling_skb);

// WAREHOUSE OCCUPANCY
router.get("/warehouse-occu", whs.warehouse_occu);
router.get("/warehouse-occu-date/:date", whs.warehouse_occu_bydate);
router.get("/warehouse-occu/:id", whs.warehouse_occu_byid);
router.get("/warehouse-occu-all", whs.warehouse_occu_all);
router.post("/warehouse-occu-update/:id", whs.edit_occupancy);

// CHECK LN2
//// GET
router.get("/arrival-ln2/:id", ln2.arrival_byId);
router.get("/arrival-ln2/:date/:supplierId", ln2.arrival_byDateSupplier);
router.get("/arrival-ln2", ln2.arrival_all);
router.get("/arrival-ln2-group", ln2.arrival_grouped);
router.get("/check-level/newest", ln2.newest_check_level);
router.get("/pengisian-ln2/:id", ln2.pengisian_byArrivalId);
router.get("/report-ln2/:date", ln2.view_report_ln2);
router.get("/report-ln2-range/:start/:end", ln2.view_range_report_ln2);
router.get("/ln2-karyawan", ln2.karyawan);
router.get("/ln2-supplier", ln2.supplier);
router.get("/ln2-tanki", ln2.tanki);
//// POST
router.post("/arrival-create", ln2.arrival_create);
router.post("/ln2-karyawan/create", ln2.karyawan_create);
router.post("/ln2-karyawan/update", ln2.karyawan_update);
router.post("/arrival-edit/:id", ln2.arrival_update);
router.post("/arrival-create/air", ln2.arrival_air_create);
router.post("/fill-ln2/edit/:id", ln2.arrival_air_update);
router.post("/level-ln2", ln2.check_level_create);
router.post("/level-ln2/update", ln2.check_level_update);
//// DELETE
router.delete("/del/check-ln2/:date/:jam", ln2.check_level_delete);
router.delete("/del/arrival/:id", ln2.arrival_air_delete);
router.delete("/ln2-karyawan/delete/:nik", ln2.karyawan_delete);

// RMPM
//// GET
router.get("/rmpm", rmpm.index_view);
router.get("/rmpm/:date/:time", rmpm.index_by_datetime);
router.get("/rmpm-view", rmpm.index_view);
router.get("/rmpm-view/last", rmpm.index_last);
router.get("/rmpm-view/group", rmpm.index_view_group);
router.get("/rmpm/storage", rmpm.storage);
//// POST
router.post("/rmpm-create", rmpm.store);
router.post("/rmpm-create/storage", rmpm.store_storage);
router.post("/rmpm-update", rmpm.update);
//// DELETE
router.post("/rmpm-update/storage", rmpm.update_storage);
router.delete("/rmpm-del/:date/:time", rmpm.delete);
router.delete("/rmpm-del-storage/:id", rmpm.delete_storage);

// Budget Factory
//// GET
////// Shipping
router.get("/budget/shipping", budget.index_shipping);
router.get(
  "/budget/shipping-monthlist/:from",
  budget.index_shipping_yearmonth_list
);
router.get("/budget/shipping", budget.index_shipping);
router.get("/budget/shipping-kjy", budget.index_shipping_kjy);
router.get(
  "/budget/shipping-kjy/:yearmonth",
  budget.index_shipping_kjy_bymonthyear
);
router.get("/budget/shipping-skb", budget.index_shipping_skb);
router.get(
  "/budget/shipping-skb/:yearmonth",
  budget.index_shipping_skb_bymonthyear
);
////// Budget Factory
router.get("/budget/factory", budget.index_budget);
router.get("/budget/factory-yearlist/:from", budget.index_budget_year_list);
router.get("/budget/factory-kjy", budget.index_budget_kjy);
router.get("/budget/factory-kjy/:year", budget.index_budget_kjy_byyear);
router.get("/budget/factory-skb", budget.index_budget_skb);
router.get("/budget/factory-skb/:year", budget.index_budget_skb_byyear);
////// Handling
router.get("/budget/handling", budget.index_handling);
router.get("/budget/handling/:year", budget.index_handling_byyear);
////// Overhead
router.get("/budget/overhead", budget.index_overhead);
router.get("/budget/overhead/:year", budget.index_overhead_byyear);
router.get("/budget/overhand-yearlist/:type", budget.index_overhand_yearlist);
////// Budget Summary
router.get("/budget/summary", budget.index_summary);
router.get("/budget/summary-monthlist", budget.index_summary_yearmonth_list);
router.get("/budget/summary/:yearmonth", budget.index_summary_by_yearmonth);
////// FOH
router.get("/budget/foh", budget.index_foh);
//// POST
router.post("/budget/factory", budget.store_budget);
router.post("/budget/overhand", budget.store_overhand);
router.post("/budget/shipping", budget.store_shipping);
router.post("/budget/summary", budget.store_budget_summary);
//// PUT
router.put("/budget/overhead", budget.update_overhead);
router.put("/budget/factory", budget.update_budget);
router.put("/budget/shipping", budget.update_shipping);
router.put("/budget/summary", budget.update_summary);
router.put("/budget/foh", budget.update_foh_distribution);
//// DELETE
router.delete("/budget/factory/:year/:from", budget.delete_budget);
router.delete("/budget/overhand/:year/:type", budget.delete_overhand);
router.delete("/budget/shipping/:yearmonth/:from", budget.delete_shipping);
router.delete("/budget/summary/:yearmonth", budget.delete_budget_summary);

module.exports = router;
