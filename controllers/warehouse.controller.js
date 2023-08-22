const { Sequelize, QueryTypes } = require("sequelize");
const { connectScada, connectFleet } = require("../config/connection");

exports.warehouse_occu = async (req, res) => {
  try {
    const response = await connectFleet.query(
      "SELECT * FROM `fleet_distribution`.`wh_occupancy` WHERE id IN (SELECT max(id) FROM `fleet_distribution`.`wh_occupancy`) LIMIT 1",
      { type: QueryTypes.SELECT }
    );
    // const sqlQuery = ``

    res.status(200).json(response[0]);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
