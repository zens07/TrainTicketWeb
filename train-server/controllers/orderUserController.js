const models = require("../models");

const { Op } = require("sequelize");
const User = models.user;
const Train = models.train;
const Typetrain = models.typetrain;
const OrderTicket = models.order;

const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./images",
  filename: function(req, file, cb) {
    console.log(file);
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  }
});

exports.index = async (req, res) => {
  try {
    const userId = req.user.userId;
    const data = await OrderTicket.findAll({
      include: [
        {
          model: User,
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"]
          }
        },
        {
          model: Train,
          attributes: {
            exclude: ["createdAt", "updatedAt", "qty", "price"]
          },
          include: [
            {
              model: Typetrain,
              attributes: {
                exclude: ["createdAt", "updatedAt"]
              }
            }
          ]
        }
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "trainId", "userId"]
      },
      where: { userId: userId }
    });
    if (data) {
      res.status(200).send({
        message: "Your All Ticket",
        status: 200,
        data
      });
    } else {
      res.status(400).send({
        message: "You not ordering ticket",
        status: 401
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.show = async (req, res) => {
  try {
    const { orderId } = req.query;
    const data = await toDisplay(orderId);
    if (data) {
      res.status(200).send({
        message: "Your Ticket",
        status: 200,
        data
      });
    } else {
      res.status(400).send({
        message: "Not Found Ticket",
        status: 400
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.insert = async (req, res) => {
  try {
    const { trainId, qty } = req.body;
    // let findTrain = {};
    const findTrain = await Train.findOne({
      where: { id: trainId }
    });
    const createOrder = await OrderTicket.create({
      userId: req.user.userId,
      trainId: findTrain.id,
      price: findTrain.price,
      qty,
      totalPrice: findTrain.price * qty,
      status: "pending"
    });
    if (createOrder) {
      const findOrder = await OrderTicket.findOne({
        where: { id: createOrder.id }
      });
      const data = await toDisplay(findOrder.id);
      res.status(200).send({
        message: "success full inputted",
        status: 200,
        data
      });
    } else {
      res.status(400).send({
        message: "data is not entered to repeat",
        status: 400
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.edit = async (req, res) => {
  try {
    // upload(req, res, err => {
    //   if (err) throw err;
    //   const data = {
    //     orderId: req.body.orderId,
    //     filename: req.file.filename
    //   };

    await OrderTicket.update(
      { attacment: req.body.attacment },
      { where: { id: req.params.id } }
    );

    const data = await toDisplay(req.params.id);
    res.status(200).send({
      message: "Success Editing",
      status: 200,
      data
    });
    // });
  } catch (error) {
    console.log(error);
  }
};

exports.upload = (req, res) => {};

//displaying data
const toDisplay = orderId => {
  return new Promise((resolve, reject) => {
    const data = OrderTicket.findOne({
      include: [
        {
          model: User,
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "status"]
          }
        },
        {
          model: Train,
          attributes: {
            exclude: ["createdAt", "updatedAt", "qty", "price"]
          },
          include: [
            {
              model: Typetrain,
              attributes: {
                exclude: ["createdAt", "updatedAt"]
              }
            }
          ]
        }
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "trainId", "userId"]
      },
      where: { id: orderId }
    });
    if (data) {
      resolve(data);
    } else {
      reject(error);
    }
  });
};
