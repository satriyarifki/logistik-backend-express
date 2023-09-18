const { Sequelize, QueryTypes } = require("sequelize");
const {
  connectScada,
  connectFleet,
  connectLn,
} = require("../config/connection");

const test = "SELECT * FROM `pengecekan_ln2`.`arrival_view` WHERE id = $id "

// GET DATA ALL
exports.arrival_byId = async (req, res) => {
  try {
    //
    const id = req.params.id;
    const response = await connectLn
      .query("SELECT a.id, a.date, s.nama_supplier AS supplier, a.no_mobil, a.checkerId, c.no_surat_jalan, c.no_po, c.qty, a.jenis_mobil FROM arrival_ln2 AS a INNER JOIN catatan_pengisian AS c ON a.id = c.arrivalId INNER JOIN tb_supplier AS s ON a.supplierId = s.id WHERE a.id = $id ", {
        bind: { id: id },
        type: QueryTypes.SELECT,
      })
      // .then((result) => {
      //   result;
      //   console.log(result);
      // })
      // .catch((err) => {
      //   err;
      //   console.log(err);
      // });
    // const response = { trucking: trucking, arrival: arrival, deliveryDestination: delivery };
    res.status(200).json(response[0]);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
exports.arrival_all = async (req, res) => {
  try {
    //
    const response = await connectLn.query(
      "SELECT * FROM arrival_view ORDER BY date DESC  ",
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
exports.pengisian_byArrivalId = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await connectLn.query(
      "SELECT * FROM catatan_pengisian WHERE arrivalId = $arrivalId   ",
      {
        bind: { arrivalId: id },
        type: QueryTypes.SELECT,
      }
    );
    // const response = { trucking: trucking, arrival: arrival, deliveryDestination: delivery };
    res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
exports.arrival_create = async (req, res) => {
  try {
    //
    console.log(req.body);
    const response = await connectLn.query(
      "INSERT INTO `pengecekan_ln2`.`arrival_ln2` (`date` ,`checkerId` ,`supplierId` ,`no_mobil` ,`jenis_mobil`) VALUES ($date ,$checkerId ,$supplierId ,$no_mobil ,$jenis_mobil) ",
      {
        bind: {
          date: req.body.date,
          checkerId: req.body.checkerId,
          supplierId: req.body.supplierId,
          no_mobil: req.body.no_mobil,
          jenis_mobil: req.body.jenis_mobil,
        },
        type: QueryTypes.INSERT,
      }
    );
    // const response = { trucking: trucking, arrival: arrival, deliveryDestination: delivery };
    res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
exports.arrival_update = async (req, res) => {
  try {
    //
    console.log(req.body);
    const { id } = req.params;
    const response = await connectLn.query(
      "UPDATE `pengecekan_ln2`.`arrival_ln2` SET `date` = $date ,`checkerId` = $checkerId ,`supplierId` = $supplierId ,`no_mobil` = $no_mobil,`jenis_mobil` = $jenis_mobil WHERE id = $id",
      {
        bind: {
          id : id,
          date: req.body.date,
          checkerId: req.body.checkerId,
          supplierId: req.body.supplierId,
          no_mobil: req.body.no_mobil,
          jenis_mobil: req.body.jenis_mobil,
        },
        type: QueryTypes.UPDATE,
      }
    );
    // const response = { trucking: trucking, arrival: arrival, deliveryDestination: delivery };
    res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
exports.arrival_air_create = async (req, res) => {
  try {
    //
    const response = await connectLn.query(
      "INSERT INTO `pengecekan_ln2`.`catatan_pengisian` (`arrivalId`,`tankiId`  ,`level_sebelum`  ,`press_sebelum`  ,`jam_sebelum`  ,`level_sesudah`  ,`press_sesudah`  ,`jam_sesudah`  ,`no_surat_jalan`,`no_po`,`qty`  ,`satuan`) VALUES ($arrivalId, $tankiId, $level_sebelum, $press_sebelum, $jam_sebelum, $level_sesudah, $press_sesudah, $jam_sesudah, $no_surat_jalan, $no_po, $qty, $satuan) ",
      {
        bind: {
          arrivalId: req.body.arrivalId,
          tankiId: req.body.tankiId,
          level_sebelum: req.body.level_sebelum,
          press_sebelum: req.body.press_sebelum,
          jam_sebelum: req.body.jam_sebelum,
          level_sesudah: req.body.level_sesudah,
          press_sesudah: req.body.press_sesudah,
          jam_sesudah: req.body.jam_sesudah,
          no_surat_jalan: req.body.no_surat_jalan,
          no_po: req.body.no_po,
          qty: req.body.qty,
          satuan: req.body.satuan,
        },
        type: QueryTypes.INSERT,
      }
    );
    // const response = { trucking: trucking, arrival: arrival, deliveryDestination: delivery };
    res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
exports.arrival_air_update = async (req, res) => {
  try {
    //
    console.log(req.body);
    const { id } = req.params;
    console.log(id);
    const response = await connectLn.query(
      "UPDATE `pengecekan_ln2`.`catatan_pengisian` SET  `level_sebelum` = $level_sebelum ,`press_sebelum` = $press_sebelum ,`jam_sebelum` = $jam_sebelum  ,`level_sesudah` = $level_sesudah  ,`press_sesudah` = $press_sesudah ,`jam_sesudah` = $jam_sesudah  ,`no_surat_jalan` = $no_surat_jalan,`no_po` = $no_po,`qty` = $qty ,`satuan` = $satuan WHERE id = $id ",
      {
        bind: {
          id : id,
          arrivalId: req.body.arrivalId,
          tankiId: req.body.tankiId,
          level_sebelum: req.body.level_sebelum,
          press_sebelum: req.body.press_sebelum,
          jam_sebelum: req.body.jam_sebelum,
          level_sesudah: req.body.level_sesudah,
          press_sesudah: req.body.press_sesudah,
          jam_sesudah: req.body.jam_sesudah,
          no_surat_jalan: req.body.no_surat_jalan,
          no_po: req.body.no_po,
          qty: req.body.qty,
          satuan: req.body.satuan,
        },
        type: QueryTypes.UPDATE,
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
exports.check_level_create = async (req, res) => {
  try {
    //
    console.log(req.body);
    const response = await connectLn.query(
      "INSERT INTO `pengecekan_ln2`.`check_level_ln2` (`date`, `jam`, `supplierId` , `checkerId`, `tankiId`  ,`level`  ,`pressure` ) VALUES (date = $date, jam = $jam, supplierId = $supplierId, checkerId = $checkerId, tankiId = $tankiId,level = $level,pressure = $press) ",
      {
        bind: {
          date: req.body.date,
          jam: req.body.jam,
          supplierId: req.body.supplierId,
          tankiId: req.body.tankiId,
          checkerId: req.body.checkerId,
          level: req.body.level,
          press: req.body.press,
        },
        type: QueryTypes.INSERT,
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
