const { Sequelize, QueryTypes } = require("sequelize");
const { connectBudget } = require("../config/connection");
const fs = require("fs");

// INDEX
exports.index_shipping = async (req, res) => {
  try {
    //
    const response = await connectBudget.query(
      "SELECT * FROM shipping_destination",
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
exports.index_shipping_kjy = async (req, res) => {
  try {
    //
    const response = await connectBudget.query(
      "SELECT * FROM shipping_destination as s WHERE s.from = 'Kejayan'",
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
exports.index_shipping_skb = async (req, res) => {
  try {
    //
    const response = await connectBudget.query(
      "SELECT * FROM shipping_destination as s WHERE s.from = 'Sukabumi'",
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
exports.index_budget = async (req, res) => {
  try {
    //
    const response = await connectBudget.query(
      "SELECT * FROM budget_vs_factory ",
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
exports.index_budget_kjy = async (req, res) => {
  try {
    //
    const response = await connectBudget.query(
      "SELECT * FROM budget_vs_factory as b WHERE b.from = 'Kejayan'",
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
exports.index_budget_skb = async (req, res) => {
  try {
    //
    const response = await connectBudget.query(
      "SELECT * FROM budget_vs_factory as b WHERE b.from = 'Sukabumi'",
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
exports.index_handling = async (req, res) => {
  try {
    //
    const response = await connectBudget.query(
      "SELECT * FROM warehouse_factory WHERE type = 'Handling'",
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
exports.index_overhead = async (req, res) => {
  try {
    //
    const response = await connectBudget.query(
      "SELECT * FROM warehouse_factory WHERE type = 'Overhead'",
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
exports.index_summary = async (req, res) => {
  try {
    //
    const response = await connectBudget.query("SELECT * FROM budget_summary", {
      type: QueryTypes.SELECT,
    });
    // const response = { trucking: trucking, arrival: arrival, deliveryDestination: delivery };
    res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
exports.index_foh = async (req, res) => {
  try {
    //
    const response = await connectBudget.query(
      "SELECT f.id, i.name as item, f.percentage FROM foh_distribution as f INNER JOIN item_foh as i ON i.id = f.itemId",
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

// STORE
exports.store_overhead = async (req, res) => {
  try {
    //
    let response;
    await req.body.items.forEach((element) => {
      // console.log(element);
      response = connectBudget.query(
        "INSERT INTO warehouse_factory (`date` ,`skb` ,`kjy` ,`type`) VALUES ($date ,$skb ,$kjy ,$type) ",
        {
          bind: {
            date: elem.date + "-01",
            skb: elem.skb,
            kjy: element.kjy,
            type: element.type,
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

// UPDATE
exports.update_shipping = async (req, res) => {
  try {
    //
    let response;
    await req.body.items.forEach((elem) => {
      // console.log(element);
      response = connectBudget.query(
        "UPDATE shipping_destination SET `destination` = $destination  ,`percentage` = $percentage ,`qty_carton` = $qty_carton ,`from` = $from  WHERE id = $id",
        {
          bind: {
            id: elem.id,
            destination: elem.destination,
            percentage: elem.percentage,
            qty_carton: elem.qty_carton,
            from: elem.from,
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
exports.update_budget = async (req, res) => {
  try {
    //
    await req.body.items.forEach((elem) => {
      // console.log(element);
      response = connectBudget.query(
        "UPDATE budget_vs_factory SET `date` = $date  ,`bud` = $bud ,`foh` = $foh ,`from` = $from  WHERE id = $id",
        {
          bind: {
            id: elem.id,
            date: elem.date + "-01",
            bud: elem.bud,
            foh: elem.foh,
            from: elem.from,
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
exports.update_overhead = async (req, res) => {
  try {
    //
    let response;
    await req.body.items.forEach((elem) => {
      // console.log(element);
      response = connectBudget.query(
        "UPDATE warehouse_factory SET `date` = $date  ,`skb` = $skb ,`kjy` = $kjy ,`type` = $type  WHERE id = $id",
        {
          bind: {
            id: elem.id,
            date: elem.date + "-01",
            skb: elem.skb,
            kjy: elem.kjy,
            type: elem.type,
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
exports.update_summary = async (req, res) => {
  try {
    //
    let response;
    await req.body.items.forEach((elem) => {
      // console.log(element);
      response = connectBudget.query(
        "UPDATE budget_summary SET `name` = $name  ,`value` = $value, `month`= $month WHERE id = $id",
        {
          bind: {
            id: elem.id,
            name: elem.name,
            value: elem.value,
            month: elem.month,
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
exports.update_foh_distribution = async (req, res) => {
  try {
    //
    let response;
    await req.body.items.forEach((elem) => {
      // console.log(element);
      response = connectBudget.query(
        "UPDATE foh_distribution SET `percentage` = $percentage WHERE id = $id",
        {
          bind: {
            id: elem.id,
            percentage: elem.percentage,
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
