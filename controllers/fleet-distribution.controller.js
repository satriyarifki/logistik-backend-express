const { Sequelize, QueryTypes } = require('sequelize');
const { connectScada, connectFleet } = require('../config/connection');

exports.fleetdistribution_kejayan = async (req, res) => {
	try {
		const trucking = await connectFleet.query('SELECT * FROM `fleet_distribution`.`trucking_from_kejayan` WHERE id IN (SELECT max(id) FROM `fleet_distribution`.`trucking_from_kejayan`) ', { type: QueryTypes.SELECT });
		// const sqlQuery = ``
		const arrival = await connectFleet.query(
			'SELECT date, `within_time_limit_<_=_11_pm` as within_time, `out_of_the_limit_>_=_11_pm` as out_limit FROM `fleet_distribution`.`on_time_fleet_arrival_from_kejayan` WHERE id IN (SELECT max(id) FROM `fleet_distribution`.`on_time_fleet_arrival_from_kejayan`) ',
			{
				type: QueryTypes.SELECT,
			}
		);
		const delivery = await connectFleet.query('SELECT * FROM `fleet_distribution`.`delivery_by_destination_from_kejayan` WHERE id IN (SELECT max(id) FROM `fleet_distribution`.`delivery_by_destination_from_kejayan`) ', {
			type: QueryTypes.SELECT,
		});
		const response = { trucking: trucking, arrival: arrival, deliveryDestination: delivery };
		res.status(200).json(response);
	} catch (e) {
		return res.status(500).json({ error: e.message });
	}
};
exports.fleetdistribution_sukabumi = async (req, res) => {
	try {
		const trucking = await connectFleet.query('SELECT * FROM `fleet_distribution`.`trucking_from_sukabumi` WHERE id IN (SELECT max(id) FROM `fleet_distribution`.`trucking_from_sukabumi`) ', {
			type: QueryTypes.SELECT,
		});
		// const sqlQuery = ``
		const arrival = await connectFleet.query(
			'SELECT date, `within_time_limit_<_=_11_pm` as within_time, `out_of_the_limit_>_=_11_pm` as out_limit FROM `fleet_distribution`.`on_time_fleet_arrival_from_sukabumi` WHERE id IN (SELECT max(id) FROM `fleet_distribution`.`on_time_fleet_arrival_from_sukabumi`) ',
			{
				type: QueryTypes.SELECT,
			}
		);
		const delivery = await connectFleet.query('SELECT * FROM `fleet_distribution`.`delivery_by_destination_from_sukabumi` WHERE id IN (SELECT max(id) FROM `fleet_distribution`.`delivery_by_destination_from_sukabumi`) ', {
			type: QueryTypes.SELECT,
		});
		const response = { trucking: trucking, arrival: arrival, deliveryDestination: delivery };
		res.status(200).json(response);
	} catch (e) {
		return res.status(500).json({ error: e.message });
	}
};
