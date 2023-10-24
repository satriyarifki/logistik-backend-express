const { Sequelize, QueryTypes } = require("sequelize");
const { connectRmpm } = require("../config/connection");
const fs = require("fs");

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
exports.update = async (req, res) => {
  try {
    //
    console.log(req.body);
    let response;
    await req.body.items.forEach((element) => {
      console.log(element);
      response = connectRmpm.query(
        "UPDATE occupancy SET  used = $used WHERE date = $date AND time = $time AND storageId = $storageId ",
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
exports.test = async (req, res) => {
  try {
    //
    let result = [];
    const mrkContent = fs.readFileSync("controllers/Calendar.mrk", "utf8");
    // const mrkConten = fs.readFile("controllers/Calendar.mrk");
    // const mrkLines = mrkContent.split("<Event");
    const regexSquare = /A\[([^\]]*)\]]/;
    const regexArrow = /\>([^\]]*)\</;

    const regexStart = /id>\r\n<Start>([\s\S]*?)<\/Start>/g;
    const regexSubject = /<Subject>([\s\S]*?)<\/Subject>/g;
    const regexCreator = /<Creator>([\s\S]*?)<\/Creator>/g;
    const regexPlanner = /<Planner>([\s\S]*?)<\/Planner>/g;
    const regexEnd =
      /id>\r\n<Start>([\s\S]*?)<\/Start>\r\n<End>([\s\S]*?)<\/End>\r\n<Su/g;
    const regexModified = /<Modified>([\s\S]*?)<\/Modified>/g;
    // const regex = /<Event\b[^>]*>([\s\S]*?)<\/Event>/m;
    // const regex = /<Event[^>]*>((.|[\n\r])*)<\/Event>/g;
    const mrkStart = mrkContent.match(regexStart);
    const mrkSubject = mrkContent.match(regexSubject);
    const mrkCreator = mrkContent.match(regexCreator);
    const mrkPlanner = mrkContent.match(regexPlanner);
    const mrkEnd = mrkContent.match(regexEnd);
    const mrkModified = mrkContent.match(regexModified);
    // const subject = mrkSubject[0].match(/A\[([^\]]*)\]]/);
    mrkSubject.forEach((element, i) => {
      // console.log(element.match(regexSquare)[1] + ',' +
      // mrkCreator[i].match(regexSquare)[1] + ',' +
      // mrkPlanner[i].match(regexSquare)[1] + ',' +
      // mrkStart[i].match(/t\>([^\]]*)\</)[1] + ',' +
      // mrkEnd[i].match(regexArrow)[1] + ',' +
      // mrkModified[i].match(regexArrow)[1]);
      result.push({
        subject: element.match(regexSquare)[1],
        creator: mrkCreator[i].match(regexSquare)[1],
        planner: mrkPlanner[i].match(regexSquare)[1],
        time_start: mrkStart[i].match(/t\>([^\]]*)\</)[1],
        time_end: mrkEnd[i].match(/End\>([^\]]*)\<\//)[1],
        modified_at: mrkModified[i].match(regexArrow)[1],
      });
    });
    // console.log(mrkEvent);
    // const htmlContent = fs.rename("controllers/Calendar.mrk","controllers/Calendar.html")

    console.log(mrkStart.length);
    console.log(mrkEnd.length);
    console.log(mrkSubject.length);
    console.log(mrkCreator.length);
    console.log(mrkPlanner.length);
    console.log(mrkModified.length);
    // const response = { trucking: trucking, arrival: arrival, deliveryDestination: delivery };
    res.status(200).json({ regex: result, mrk: mrkEnd });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
