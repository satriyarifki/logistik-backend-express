const { Sequelize, QueryTypes } = require("sequelize");
const { connectScada, connectFleet } = require("../config/connection");

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
exports.fleet_kejayan_byid = async (req, res) => {
  try {
    const { date } = req.params;
    //
    const response = await connectFleet.query(
      "SELECT * FROM `fleet_distribution`.`trucking_delivery_fleet_arrival_order_handling_damage_kejayan` WHERE date =  $date ",
      {
        bind: {date: date},
        type: QueryTypes.SELECT,
      }
    );
    // const response = { trucking: trucking, arrival: arrival, deliveryDestination: delivery };
    res.status(200).json(response[0]);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
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
exports.fleet_sukabumi_byid = async (req, res) => {
  try {
    // 
    const { date } = req.params;
    const response = await connectFleet.query(
      "SELECT * FROM `fleet_distribution`.`trucking_delivery_fleet_arrival_order_handling_damage_sukabumi` WHERE date =  $date",
      {
        bind: {date: date},
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
