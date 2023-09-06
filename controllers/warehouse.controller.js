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
exports.warehouse_occu_all = async (req, res) => {
  try {
    const response = await connectFleet.query(
      "SELECT * FROM `fleet_distribution`.`wh_occupancy` ORDER BY id DESC ",
      { type: QueryTypes.SELECT }
    );
    // const sqlQuery = ``

    res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
exports.warehouse_occu_bydate = async (req, res) => {
  try {
    const { date } = req.params;
    const response = await connectFleet.query(
      "SELECT * FROM `fleet_distribution`.`wh_occupancy` WHERE date = $date LIMIT 1",
      { bind: { date: date }, type: QueryTypes.SELECT }
    );
    // const sqlQuery = ``

    res.status(200).json(response[0]);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
exports.edit_occupancy = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    const response = await connectFleet.query(
      "UPDATE `fleet_distribution`.`wh_occupancy` SET `capacity_kjy` = $capacity_kjy, `usage_kjy` = $usage_kjy,`remain_kjy` =  $remain_kjy, `percentage_kjy` = $percentage_kjy,`capacity_skb` = $capacity_skb,`usage_skb` = $usage_skb,`remain_skb`= $remain_skb ,`percentage_skb`= $percentage_skb ,`capacity_bekasi`= $capacity_bekasi ,`usage_bekasi`= $usage_bekasi ,`remain_bekasi` = $remain_bekasi ,`percentage_bekasi` = $percentage_bekasi ,`capacity_ps_rebo` = $capacity_ps_rebo,`usage_ps_rebo`=$usage_ps_rebo ,`remain_ps_rebo` = $remain_ps_rebo,`percentage_ps_rebo` = $percentage_ps_rebo,`capacity_external` = $capacity_external,`usage_external` = $usage_external ,`remain_external` = $remain_external,`percentage_external` = $percentage_external WHERE id = $id",
      {
        bind: {
          id: id,
          capacity_kjy: req.body.capacity_kjy,
          usage_kjy: req.body.usage_kjy,
          remain_kjy: req.body.capacity_kjy - req.body.usage_kjy,
          percentage_kjy: (
            (req.body.usage_kjy / req.body.capacity_kjy) *
            100
          ).toFixed(1),
          capacity_skb: req.body.capacity_skb,
          usage_skb: req.body.usage_skb,
          remain_skb: req.body.capacity_skb - req.body.usage_skb,
          percentage_skb: (
            (req.body.usage_skb / req.body.capacity_skb) *
            100
          ).toFixed(1),
          capacity_bekasi: req.body.capacity_bekasi,
          usage_bekasi: req.body.usage_bekasi,
          remain_bekasi: req.body.capacity_bekasi - req.body.usage_bekasi,
          percentage_bekasi: (
            (req.body.usage_bekasi / req.body.capacity_bekasi) *
            100
          ).toFixed(1),
          capacity_ps_rebo: req.body.capacity_ps_rebo,
          usage_ps_rebo: req.body.usage_ps_rebo,
          remain_ps_rebo: req.body.capacity_ps_rebo - req.body.usage_ps_rebo,
          percentage_ps_rebo: (
            (req.body.usage_ps_rebo / req.body.capacity_ps_rebo) *
            100
          ).toFixed(1),
          capacity_external: req.body.capacity_external,
          usage_external: req.body.usage_external,
          remain_external: req.body.capacity_external - req.body.usage_external,
          percentage_external: (
            (req.body.usage_external / req.body.capacity_external) *
            100
          ).toFixed(1),
        },
        type: QueryTypes.UPDATE,
      }
    );
    res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
