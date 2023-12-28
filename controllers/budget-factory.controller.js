const { Sequelize, QueryTypes } = require("sequelize");
const { connectBudget } = require("../config/connection");
const fs = require("fs");
const { budget_factory } = require("../config/config");

const theMonths = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
const shippingPlace = ["Distributor", "ODI", "Export", "Intersite WH", "LDC"];
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
exports.index_shipping_yearmonth_list = async (req, res) => {
  try {
    //
    const { from } = req.params;
    const response = await connectBudget.query(
      "SELECT CONCAT(YEAR(b.date),'-',MONTH(b.DATE),'-', DAY(b.date)) as yearmonth FROM shipping_destination as b WHERE b.from = ? GROUP BY yearmonth ORDER BY date",
      {
        replacements: [from],
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
exports.index_shipping_kjy_bymonthyear = async (req, res) => {
  try {
    //
    const { yearmonth } = req.params;
    const response = await connectBudget.query(
      "SELECT * FROM shipping_destination as s WHERE s.from = 'Kejayan' && s.date LIKE CONCAT('%', ? ,'%')",
      {
        replacements: [yearmonth],
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
exports.index_shipping_skb_bymonthyear = async (req, res) => {
  try {
    //
    const { yearmonth } = req.params;
    const response = await connectBudget.query(
      "SELECT * FROM shipping_destination as s WHERE s.from = 'Sukabumi' && s.date LIKE CONCAT('%', ? ,'%')",
      {
        replacements: [yearmonth],
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
      "SELECT * FROM budget_vs_factory ORDER BY date",
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
exports.index_budget_year_list = async (req, res) => {
  try {
    //
    console.log(req.body);
    const { from } = req.params;
    const response = await connectBudget.query(
      "SELECT YEAR(b.date) as year FROM budget_vs_factory as b WHERE b.from = ? GROUP BY year ORDER BY year",
      {
        replacements: [from],
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
    const { year } = req.params;
    const response = await connectBudget.query(
      "SELECT * FROM budget_vs_factory as b WHERE b.from = 'Kejayan' ORDER BY b.date",
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
exports.index_budget_kjy_byyear = async (req, res) => {
  try {
    //
    const { year } = req.params;
    const response = await connectBudget.query(
      "SELECT * FROM budget_vs_factory as b WHERE b.from = 'Kejayan' AND YEAR(b.date) = ? ORDER BY b.date",
      {
        replacements: [year],
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
      "SELECT * FROM budget_vs_factory as b WHERE b.from = 'Sukabumi' ORDER BY b.date",
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
exports.index_budget_skb_byyear = async (req, res) => {
  try {
    //
    const { year } = req.params;
    const response = await connectBudget.query(
      "SELECT * FROM budget_vs_factory as b WHERE b.from = 'Sukabumi' AND YEAR(b.date) = ? ORDER BY b.date",
      {
        replacements: [year],
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
exports.index_handling_byyear = async (req, res) => {
  try {
    //
    const { year } = req.params;
    const response = await connectBudget.query(
      "SELECT * FROM warehouse_factory WHERE type = 'Handling' AND YEAR(date) = ? ORDER BY date",
      {
        replacements: [year],
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
exports.index_overhead_byyear = async (req, res) => {
  try {
    //
    const { year } = req.params;
    const response = await connectBudget.query(
      "SELECT * FROM warehouse_factory WHERE type = 'Overhead' AND YEAR(date) = ? ORDER BY date",
      {
        replacements: [year],
        type: QueryTypes.SELECT,
      }
    );
    // const response = { trucking: trucking, arrival: arrival, deliveryDestination: delivery };
    res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
exports.index_overhand_yearlist = async (req, res) => {
  try {
    //
    console.log(req.body);
    const { type } = req.params;
    const response = await connectBudget.query(
      "SELECT YEAR(b.date) as year FROM warehouse_factory as b WHERE b.type = ? GROUP BY year ORDER BY year",
      {
        replacements: [type],
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
exports.store_overhand = async (req, res) => {
  try {
    //
    console.log(req.body);
    let response;
    theMonths.forEach((elem) => {
      // console.log(element);
      response = connectBudget.query(
        "INSERT INTO warehouse_factory (`date` ,`skb` ,`kjy` ,`type`) VALUES ($date ,0 ,0 ,$type) ",
        {
          bind: {
            date: req.body.year + "-" + elem + "-01",
            type: req.body.type,
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
exports.store_budget = async (req, res) => {
  try {
    //
    let response = [];
    theMonths.forEach(async (elem) => {
      let resp = await connectBudget.query(
        "INSERT INTO budget_vs_factory (`date` ,`bud` ,`foh` ,`from`) VALUES ($date ,0 ,0 ,$from) ",
        {
          bind: {
            date: req.body.year + "-" + elem + "-01",
            from: req.body.from,
          },
          type: QueryTypes.INSERT,
        }
      );
      console.log(resp);
      response.push(resp);
    });

    // const response = { trucking: trucking, arrival: arrival, deliveryDestination: delivery };
    res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
exports.store_shipping = async (req, res) => {
  try {
    //
    let response = [];
    shippingPlace.forEach(async (elem) => {
      let resp = await connectBudget.query(
        "INSERT INTO shipping_destination (`date` ,`destination` ,`percentage` ,`qty_carton`,`from`) VALUES ($date ,$destination ,0, 0 ,$from) ",
        {
          bind: {
            date: req.body.date,
            destination: req.body.elem,
            from: req.body.from,
          },
          type: QueryTypes.INSERT,
        }
      );
      console.log(resp);
      response.push(resp);
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

// DELETE
exports.delete_budget = async (req, res) => {
  // console.log(req.body)
  try {
    //
    console.log(req.body);
    const { year, from } = req.params;
    const response = await connectBudget.query(
      "DELETE FROM budget_vs_factory WHERE YEAR(date) = ? AND `from` = ?",
      {
        replacements: [year, from],
        type: QueryTypes.DELETE,
      }
    );

    // const response = { trucking: trucking, arrival: arrival, deliveryDestination: delivery };
    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message });
  }
};
exports.delete_overhand = async (req, res) => {
  // console.log(req.body)
  try {
    //
    console.log(req.body);
    const { year, type } = req.params;
    const response = await connectBudget.query(
      "DELETE FROM warehouse_factory WHERE YEAR(date) = ? AND `type` = ?",
      {
        replacements: [year, type],
        type: QueryTypes.DELETE,
      }
    );

    // const response = { trucking: trucking, arrival: arrival, deliveryDestination: delivery };
    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message });
  }
};
