const models = require("../models");

const { Op } = require("sequelize");
const User = models.user;
const Train = models.train;
const Typetrain = models.typetrain;
const OrderTicket = models.order;

exports.index = async (req, res) => {
  try {
    const userId = req.user.userId;
    const verifyUser = await User.findOne({
      where: { id: userId }
    });
    console.log(verifyUser);
    if (verifyUser.status == true) {
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
        }
      });
      if (data) {
        res.status(200).send({
          message: "All Ticket",
          status: 200,
          data
        });
      } else {
        res.status(400).send({
          message: "Entered Data Failed",
          status: 400
        });
      }
    } else {
      res.status(401).send({
        message: "you not access this page",
        status: 401
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.show = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await toDisplay(id);
    if (data) {
      res.status(200).send({
        message: "Detail Tiket",
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

exports.edit = async (req, res) => {
  try {
    const { status } = req.body;
    const verifyUser = await User.findOne({
      where: { id: req.user.userId }
    });
    // console.log(verifyUser);
    if (verifyUser.status) {
      const verifyOrder = await User.findOne({
        where: { id: req.params.id }
      });
      if (verifyOrder.status != status) {
        const editOrder = await OrderTicket.update(
          { status },
          { where: { id: req.params.id } }
        );
        if (editOrder) {
          const findOrder = await OrderTicket.findOne({
            where: { id: req.params.id }
          });
          if (findOrder.status) {
            const trainData = await Train.findOne({
              where: { id: findOrder.trainId }
            });
            await Train.update(
              {
                qty: trainData.qty - findOrder.qty
              },
              {
                where: { id: findOrder.trainId }
              }
            );
            const data = await toDisplay(findOrder.id);
            res.status(200).send({
              message: "Success Editing",
              status: 200,
              data
            });
          } else {
            const trainData = await Train.findOne({
              where: { id: findOrder.trainId }
            });
            await Train.update(
              {
                qty: trainData.qty + findOrder.qty
              },
              {
                where: { id: findOrder.trainId }
              }
            );
            const data = await toDisplay(findOrder.id);
            res.status(200).send({
              message: "Success Editing",
              status: 200,
              data
            });
          }
        } else {
          res.status(400).send({
            message: "Bad Request Data incomplete",
            status: 400
          });
        }
      } else {
        res.status(201).send({
          message: "status has been change in last",
          status: 201
        });
      }
    } else {
      res.status(401).send({
        message: "you not role admin",
        status: 401
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.deleted = async (req, res) => {
  try {
    const verifyUser = await User.findOne({
      where: { id: req.user.userId }
    });
    if (verifyUser.status) {
      await OrderTicket.destroy({
        where: { id: req.params.id }
      });
      res.status(200).send({
        message: "deleted successfully",
        status: 200
      });
    } else {
      res.status(401).send({
        message: "you not access this page",
        status: 401
      });
    }
  } catch (error) {
    console.log(error);
  }
};

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
            exclude: ["createdAt", "updatedAt"]
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
