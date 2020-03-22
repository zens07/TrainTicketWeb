const models = require("../models");
const Train = models.train;
const TypeTrain = models.typetrain;
const User = models.user;
const { Op } = require("sequelize");

exports.findStation = async (req, res) => {
  try {
    console.log(req.body);
    const { station, detinationStation, dateStart } = req.body;
    // const d = new Date(dateStart);
    if (station.length > 0 && detinationStation.length > 0) {
      const data = await Train.findAll({
        where: {
          // station: station,
          // detinationStation: detinationStation
          // dateStart: d

          [Op.or]: [
            { station: station, detinationStation: detinationStation },
            { detinationStation: station, station: detinationStation },
            { dateStart: new Date(dateStart) }
            // { dateStart: { [Op.between]: [dateStart, dateStart] } }
            // {
            //   dateStart: {
            //     [Op.between]: [
            //       new Date(Date(dateStart)),
            //       new Date(Date(dateStart))
            //     ]
            //   }
            // }
          ]
        },
        include: [
          {
            model: TypeTrain,
            attributes: { exclude: ["createdAt", "updatedAt"] }
          }
        ]
      });
      // if (data) {
      res.status(200).send({
        message: "All data in your search",
        data
      });
    } else {
      res.status(404).send({
        message: "Data Not Found"
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.allTrain = async (req, res) => {
  try {
    const data = Train.findALl();
    if (data > length) {
      res.status(200).send({
        message: "All Data Train Ticket",
        data
      });
    } else {
      res.status(404).send({
        message: "Not Data Found"
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//admin only
exports.insert = async (req, res) => {
  try {
    const verifyUser = await User.findOne({
      where: { id: req.user.userId }
    });

    if (verifyUser.status) {
      const {
        name,
        typeTrainId,
        dateStart,
        station,
        startTime,
        detinationStation,
        arrivalTime,
        price,
        qty
      } = req.body;
      const data = await Train.create({
        name,
        typeTrainId,
        dateStart,
        station,
        startTime,
        detinationStation,
        arrivalTime,
        price,
        qty
      });
      res.status(200).send({
        message: "Success Created Ticket",
        data
      });
    } else {
      res.status(401).send({
        message: "Not Created Ticket",
        data
      });
    }
  } catch (error) {
    console.log(error);
  }
};
