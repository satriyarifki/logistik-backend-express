const { Sequelize, QueryTypes } = require("sequelize");
const { connectRmpm } = require("../config/connection");
const fs = require("fs");

// INDEX
exports.index = async (req, res) => {
  try {
    //
    const response = await connectRmpm.query("SELECT * FROM occupancy", {
      type: QueryTypes.SELECT,
    });
    // const response = { trucking: trucking, arrival: arrival, deliveryDestination: delivery };
    res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
exports.index_by_datetime = async (req, res) => {
  try {
    //
    const { date, time } = req.params;
    const response = await connectRmpm.query(
      "SELECT * FROM occupancy WHERE date = $date AND time = $time ORDER BY storageId",
      {
        bind: {
          date: date,
          time: time,
        },
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
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
exports.index_view_group = async (req, res) => {
  try {
    //
    const response = await connectRmpm.query(
      "SELECT *, COUNT(*) as count FROM view_occupancy_storage GROUP BY date,time  ",
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
exports.index_last = async (req, res) => {
  try {
    //
    const { date } = req.params;
    const response = await connectRmpm.query(
      "SELECT * FROM view_last_occupancy",
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
    const response = await connectRmpm.query("SELECT * FROM storage  ", {
      type: QueryTypes.SELECT,
    });
    res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

// STORE
exports.store = async (req, res) => {
  try {
    //
    console.log(req.body);
    let response;
    await req.body.items.forEach((element) => {
      // console.log(element);
      response = connectRmpm.query(
        "INSERT INTO occupancy (`date` ,`time` ,`storageId` ,`used`) VALUES ($date ,$time ,$storageId ,$used) ",
        {
          bind: {
            date: req.body.date,
            time: req.body.time,
            storageId: element.storageId,
            used: element.used,
          },
          type: QueryTypes.INSERT,
        }
      );
    });

    // const response = { trucking: trucking, arrival: arrival, deliveryDestination: delivery };
    res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
exports.store_storage = async (req, res) => {
  try {
    //
    const response = await connectRmpm.query(
      "INSERT INTO storage (`name` ,`min_temp` ,`max_temp` ,`capacity`, type) VALUES ($name ,$min_temp ,$max_temp ,$capacity, $type) ",
      {
        bind: {
          min_temp: req.body.min_temp,
          max_temp: req.body.max_temp,
          capacity: req.body.capacity,
          name: req.body.name,
          type: req.body.type,
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

// UPDATE
exports.update = async (req, res) => {
  try {
    //
    console.log(req.body);
    let response;
    await req.body.items.forEach((element) => {
      console.log(element);
      response = connectRmpm.query(
        "UPDATE occupancy SET used = $used WHERE date = $date AND time = $time AND storageId = $storageId ",
        {
          bind: {
            date: req.body.date,
            time: req.body.time,
            storageId: element.storageId,
            used: element.used,
          },
          type: QueryTypes.UPDATE,
        }
      );
    });

    // const response = { trucking: trucking, arrival: arrival, deliveryDestination: delivery };
    res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
exports.update_storage = async (req, res) => {
  try {
    //
    console.log(req.body);

    const response = connectRmpm.query(
      "UPDATE storage SET  name = $name,min_temp = $min_temp,max_temp = $max_temp,capacity = $capacity,type = $type WHERE id = $id  ",
      {
        bind: {
          id: req.body.id,
          min_temp: req.body.min_temp,
          max_temp: req.body.max_temp,
          capacity: req.body.capacity,
          name: req.body.name,
          type: req.body.type,
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

// DELETE
exports.delete = async (req, res) => {
  try {
    //
    console.log(req.body);
    const { date, time } = req.params;
    const response = await connectRmpm.query(
      "DELETE FROM occupancy WHERE date = $date AND time = $time",
      {
        bind: {
          date: date,
          time: time,
        },
        type: QueryTypes.DELETE,
      }
    );

    // const response = { trucking: trucking, arrival: arrival, deliveryDestination: delivery };
    res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
exports.delete_storage = async (req, res) => {
  try {
    //
    const { id } = req.params;
    const response = await connectRmpm.query(
      "DELETE FROM storage WHERE id = $id",
      {
        bind: {
          id: id,
        },
        type: QueryTypes.DELETE,
      }
    );

    // const response = { trucking: trucking, arrival: arrival, deliveryDestination: delivery };
    res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
