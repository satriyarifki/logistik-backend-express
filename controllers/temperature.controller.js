const { Sequelize, QueryTypes } = require('sequelize');
const { connectScada } = require('../config/connection');

exports.temppocari = async (req, res) => {
	try {
		const response = await connectScada.query('SELECT * FROM `scada_db1`.`temppocari` WHERE time IN (SELECT max(time) FROM `scada_db1`.`temppocari`)', { type: QueryTypes.SELECT });

		res.status(200).json(response);
	} catch (e) {
		return res.status(500).json({ error: e.message });
	}
};
exports.tempsoyjoy = async (req, res) => {
	try {
		const response = await connectScada.query('SELECT * FROM `scada_db1`.`tempsj_1` WHERE time IN (SELECT max(time) FROM `scada_db1`.`temppocari`)', { type: QueryTypes.SELECT });

		res.status(200).json(response);
	} catch (e) {
		return res.status(500).json({ error: e.message });
	}
};
