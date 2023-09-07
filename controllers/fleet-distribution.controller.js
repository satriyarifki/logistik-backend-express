const { Sequelize, QueryTypes } = require("sequelize");
const { connectScada, connectFleet } = require("../config/connection");

// GET DATA ALL
exports.fleet_kejayan_all = async (req, res) => {
  try {
    //
    const response = await connectFleet.query(
      "SELECT * FROM `fleet_distribution`.`trucking_delivery_fleet_arrival_order_handling_damage_kejayan` ORDER BY id DESC  ",
      {
        type: QueryTypes.SELECT,
      }
    );
    // const response = { trucking: trucking, arrival: arrival, deliveryDestination: delivery };
    res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
exports.fleet_sukabumi_all = async (req, res) => {
  try {
    //

    const response = await connectFleet.query(
      "SELECT * FROM `fleet_distribution`.`trucking_delivery_fleet_arrival_order_handling_damage_sukabumi` ORDER BY id DESC",
      {
        type: QueryTypes.SELECT,
      }
    );
    // const response = { trucking: trucking, arrival: arrival, deliveryDestination: delivery };
    res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

//GET DATA BY ID
exports.fleet_kejayan_byid = async (req, res) => {
  try {
    const { id } = req.params;
    //
    const response = await connectFleet.query(
      "SELECT * FROM `fleet_distribution`.`trucking_delivery_fleet_arrival_order_handling_damage_kejayan` WHERE id =  $id ",
      {
        bind: { id: id },
        type: QueryTypes.SELECT,
      }
    );
    // const response = { trucking: trucking, arrival: arrival, deliveryDestination: delivery };
    res.status(200).json(response[0]);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
exports.fleet_sukabumi_byid = async (req, res) => {
  try {
    //
    const { id } = req.params;
    const response = await connectFleet.query(
      "SELECT * FROM `fleet_distribution`.`trucking_delivery_fleet_arrival_order_handling_damage_sukabumi` WHERE id =  $id",
      {
        bind: { id: id },
        type: QueryTypes.SELECT,
      }
    );
    // const response = { trucking: trucking, arrival: arrival, deliveryDestination: delivery };
    res.status(200).json(response[0]);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

//GET DATA LAST ONE
exports.fleetdistribution_kejayan = async (req, res) => {
  try {
    // const trucking = await connectFleet.query('SELECT * FROM `fleet_distribution`.`trucking_from_kejayan` WHERE id IN (SELECT max(id) FROM `fleet_distribution`.`trucking_from_kejayan`) ', { type: QueryTypes.SELECT });
    // // const sqlQuery = ``
    // const arrival = await connectFleet.query(
    // 	'SELECT date, `within_time_limit_<_=_11_pm` as within_time, `out_of_the_limit_>_=_11_pm` as out_limit FROM `fleet_distribution`.`on_time_fleet_arrival_from_kejayan` WHERE id IN (SELECT max(id) FROM `fleet_distribution`.`on_time_fleet_arrival_from_kejayan`) ',
    // 	{
    // 		type: QueryTypes.SELECT,
    // 	}
    // );
    // const delivery = await connectFleet.query('SELECT * FROM `fleet_distribution`.`delivery_by_destination_from_kejayan` WHERE id IN (SELECT max(id) FROM `fleet_distribution`.`delivery_by_destination_from_kejayan`) ', {
    // 	type: QueryTypes.SELECT,
    // });
    const response = await connectFleet.query(
      "SELECT *, `within_time_limit_<_=_11_pm` AS within_time, `out_of_the_limit_>_=_11_pm` AS out_limit FROM `fleet_distribution`.`trucking_delivery_fleet_arrival_order_handling_damage_kejayan` WHERE id IN (SELECT max(id) FROM `fleet_distribution`.`trucking_delivery_fleet_arrival_order_handling_damage_kejayan`) ",
      {
        type: QueryTypes.SELECT,
      }
    );
    // const response = { trucking: trucking, arrival: arrival, deliveryDestination: delivery };
    res.status(200).json(response[0]);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
exports.fleetdistribution_sukabumi = async (req, res) => {
  try {
    // const trucking = await connectFleet.query('SELECT * FROM `fleet_distribution`.`trucking_from_sukabumi` WHERE id IN (SELECT max(id) FROM `fleet_distribution`.`trucking_from_sukabumi`) ', {
    // 	type: QueryTypes.SELECT,
    // });
    // // const sqlQuery = ``
    // const arrival = await connectFleet.query(
    // 	'SELECT date, `within_time_limit_<_=_11_pm` as within_time, `out_of_the_limit_>_=_11_pm` as out_limit FROM `fleet_distribution`.`on_time_fleet_arrival_from_sukabumi` WHERE id IN (SELECT max(id) FROM `fleet_distribution`.`on_time_fleet_arrival_from_sukabumi`) ',
    // 	{
    // 		type: QueryTypes.SELECT,
    // 	}
    // );
    // const delivery = await connectFleet.query('SELECT * FROM `fleet_distribution`.`delivery_by_destination_from_sukabumi` WHERE id IN (SELECT max(id) FROM `fleet_distribution`.`delivery_by_destination_from_sukabumi`) ', {
    // 	type: QueryTypes.SELECT,
    // });

    const response = await connectFleet.query(
      "SELECT *, `within_time_limit_<_=_11_pm` AS within_time, `out_of_the_limit_>_=_11_pm` AS out_limit FROM `fleet_distribution`.`trucking_delivery_fleet_arrival_order_handling_damage_sukabumi` WHERE id IN (SELECT max(id) FROM `fleet_distribution`.`trucking_delivery_fleet_arrival_order_handling_damage_sukabumi`) ",
      {
        type: QueryTypes.SELECT,
      }
    );
    // const response = { trucking: trucking, arrival: arrival, deliveryDestination: delivery };
    res.status(200).json(response[0]);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

//GET DATA MONTLY (LAST DATE)
exports.monthly_kjy = async (req, res) => {
  try {
    const response = await connectFleet.query(
      " SELECT * FROM `trucking_delivery_fleet_arrival_order_handling_damage_kejayan` WHERE id IN (SELECT MAX(id) FROM `trucking_delivery_fleet_arrival_order_handling_damage_kejayan` GROUP BY MONTH(DATE)) LIMIT 12 ",
      {
        type: QueryTypes.SELECT,
      }
    );
    // const response = { trucking: trucking, arrival: arrival, deliveryDestination: delivery };
    res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
exports.monthly_skb = async (req, res) => {
  try {
    const response = await connectFleet.query(
      " SELECT * FROM `trucking_delivery_fleet_arrival_order_handling_damage_sukabumi` WHERE id IN (SELECT MAX(id) FROM `trucking_delivery_fleet_arrival_order_handling_damage_sukabumi` GROUP BY MONTH(DATE)) LIMIT 12  ",
      {
        type: QueryTypes.SELECT,
      }
    );
    // const response = { trucking: trucking, arrival: arrival, deliveryDestination: delivery };
    res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

//EDIT DATA
exports.edit_trucking_kjy = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await connectFleet.query(
      "UPDATE `trucking_delivery_fleet_arrival_order_handling_damage_kejayan` SET container = $container,wing_box = $wing_box, tronton = $tronton, fuso = $fuso, cold_diesel = $colt WHERE id = $id",
      {
        bind: {
          id: id,
          container: req.body.container,
          wing_box: req.body.wing_box,
          tronton: req.body.tronton,
          fuso: req.body.fuso,
          colt: req.body.cold_diesel,
        },
        type: QueryTypes.UPDATE,
      }
    );
    res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
exports.edit_trucking_skb = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await connectFleet.query(
      "UPDATE `trucking_delivery_fleet_arrival_order_handling_damage_sukabumi` SET container = $container,wing_box = $wing_box, tronton = $tronton, fuso = $fuso, cold_diesel = $colt WHERE id = $id",
      {
        bind: {
          id: id,
          container: req.body.container,
          wing_box: req.body.wing_box,
          tronton: req.body.tronton,
          fuso: req.body.fuso,
          colt: req.body.cold_diesel,
        },
        type: QueryTypes.UPDATE,
      }
    );
    res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
exports.edit_delivery_kjy = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await connectFleet.query(
      "UPDATE `trucking_delivery_fleet_arrival_order_handling_damage_kejayan` SET ditributor = $distributor, odi = $odi, export = $export, intransitt_wh = $intransitt_wh, ldc = $ldc WHERE id = $id",
      {
        bind: {
          id: id,
          distributor: req.body.distributor,
          odi: req.body.odi,
          export: req.body.export,
          intransitt_wh: req.body.intransitt_wh,
          ldc: req.body.ldc,
        },
        type: QueryTypes.UPDATE,
      }
    );
    res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
exports.edit_delivery_skb = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await connectFleet.query(
      "UPDATE `trucking_delivery_fleet_arrival_order_handling_damage_sukabumi` SET ditributor = $distributor, odi = $odi, export = $export, intransitt_wh = $intransitt_wh, ldc = $ldc WHERE id = $id",
      {
        bind: {
          id: id,
          distributor: req.body.distributor,
          odi: req.body.odi,
          export: req.body.export,
          intransitt_wh: req.body.intransitt_wh,
          ldc: req.body.ldc,
        },
        type: QueryTypes.UPDATE,
      }
    );
    res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
exports.edit_ontime_kjy = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await connectFleet.query(
      "UPDATE `trucking_delivery_fleet_arrival_order_handling_damage_kejayan` SET `within_time_limit_<_=_11_pm` = $within, `out_of_the_limit_>_=_11_pm` = $out_limit WHERE id = $id",
      {
        bind: {
          id: id,
          within: req.body.within,
          out_limit: req.body.outLimit,
          
        },
        type: QueryTypes.UPDATE,
      }
    );
    res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
exports.edit_ontime_skb = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await connectFleet.query(
      "UPDATE `trucking_delivery_fleet_arrival_order_handling_damage_sukabumi` SET `within_time_limit_<_=_11_pm` = $within, `out_of_the_limit_>_=_11_pm` = $out_limit WHERE id = $id",
      {
        bind: {
          id: id,
          within: req.body.within,
          out_limit: req.body.outLimit,
          
        },
        type: QueryTypes.UPDATE,
      }
    );
    res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
exports.edit_damage_kjy = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await connectFleet.query(
      "UPDATE `trucking_delivery_fleet_arrival_order_handling_damage_kejayan` SET `qty_damage_product` = $qty WHERE id = $id",
      {
        bind: {
          id: id,
          qty: req.body.qty,
          
        },
        type: QueryTypes.UPDATE,
      }
    );
    res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
exports.edit_damage_skb = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await connectFleet.query(
      "UPDATE `trucking_delivery_fleet_arrival_order_handling_damage_sukabumi` SET `qty_damage_product` = $qty WHERE id = $id",
      {
        bind: {
          id: id,
          qty: req.body.qty,
          
        },
        type: QueryTypes.UPDATE,
      }
    );
    res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
exports.edit_perfect_kjy = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await connectFleet.query(
      "UPDATE `trucking_delivery_fleet_arrival_order_handling_damage_kejayan` SET `qty_shipment` = $qty, `percentage` = $percentage WHERE id = $id",
      {
        bind: {
          id: id,
          qty: req.body.qty,
          percentage: req.body.percentage,
          
        },
        type: QueryTypes.UPDATE,
      }
    );
    res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
exports.edit_perfect_skb = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await connectFleet.query(
      "UPDATE `trucking_delivery_fleet_arrival_order_handling_damage_sukabumi` SET `qty_shipment` = $qty, `percentage` = $percentage WHERE id = $id",
      {
        bind: {
          id: id,
          qty: req.body.qty,
          percentage: req.body.percentage,
          
        },
        type: QueryTypes.UPDATE,
      }
    );
    res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

exports.edit_handling_kjy = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await connectFleet.query(
      "UPDATE `trucking_delivery_fleet_arrival_order_handling_damage_kejayan` SET `qty_handling_load` = $qty WHERE id = $id",
      {
        bind: {
          id: id,
          qty: req.body.qty,
          
        },
        type: QueryTypes.UPDATE,
      }
    );
    res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
exports.edit_handling_skb = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await connectFleet.query(
      "UPDATE `trucking_delivery_fleet_arrival_order_handling_damage_sukabumi` SET `qty_handling_load` = $qty WHERE id = $id",
      {
        bind: {
          id: id,
          qty: req.body.qty,
          
        },
        type: QueryTypes.UPDATE,
      }
    );
    res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
