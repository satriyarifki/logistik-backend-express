const { Sequelize, QueryTypes } = require("sequelize");
const { connectScada, connectFleet, connectLn } = require("../config/connection");

// GET DATA ALL
exports.arrival_ln2_all = async (req, res) => {
  try {
    //
    const response = await connectLn.query(
      "SELECT * FROM `pengecekan_ln2`.`cek_kedatangan_ln2` ORDER BY id DESC  ",
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
exports.arrival_all = async (req, res) => {
  try {
    //
    const response = await connectLn.query(
      "SELECT id, date, checkerId, (SELECT nama_supplier FROM tb_supplier WHERE id = a.supplierId) as supplier, no_mobil, jenis_mobil FROM `pengecekan_ln2`.`arrival_ln2` as a ORDER BY id DESC  ",
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
exports.view_report_ln2 = async (req, res) => {
  try {
    //
    const response = await connectLn.query(
      "SELECT * FROM `pengecekan_ln2`.`report_update_kondisi_ln2` ORDER BY id DESC  ",
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
exports.karyawan = async (req, res) => {
  try {
    //
    const response = await connectLn.query(
      "SELECT * FROM `pengecekan_ln2`.`tb_karyawan` ",
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
exports.supplier = async (req, res) => {
  try {
    //
    const response = await connectLn.query(
      "SELECT * FROM `pengecekan_ln2`.`tb_supplier` ",
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
exports.tanki = async (req, res) => {
  try {
    //
    const response = await connectLn.query(
      "SELECT * FROM `pengecekan_ln2`.`tb_tanki` ",
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
exports.air_product_all = async (req, res) => {
  try {
    //
    const response = await connectLn.query(
      "SELECT * FROM `pengecekan_ln2`.`ln2_air_product` ORDER BY id DESC  ",
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
exports.samator_soyjoy_all = async (req, res) => {
  try {
    //
    const response = await connectLn.query(
      "SELECT * FROM `pengecekan_ln2`.`ln2_samator_soyjoy` ORDER BY id DESC  ",
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
exports.samator_tb1_all = async (req, res) => {
  try {
    //
    const response = await connectLn.query(
      "SELECT * FROM `pengecekan_ln2`.`ln2_samator_tb1` ORDER BY id DESC  ",
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
exports.samator_tb2_all = async (req, res) => {
  try {
    //
    const response = await connectLn.query(
      "SELECT * FROM `pengecekan_ln2`.`ln2_samator_tb2` ORDER BY id DESC  ",
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
