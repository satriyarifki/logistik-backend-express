const { Sequelize, QueryTypes } = require("sequelize");
const {
  connectRmpm
} = require("../config/connection");

exports.index_view = async (req, res) => {
    try {
      //
      const response = await connectRmpm.query(
        "SELECT * FROM view_occupancy_storage  ",
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
exports.storage = async (req, res) => {
    try {
      //
      const response = await connectRmpm.query(
        "SELECT * FROM storage  ",
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