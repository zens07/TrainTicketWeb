const bcrypt = require("bcryptjs");
// const salt = bcrypt.genSaltSync(10);

const jwt = require("jsonwebtoken");
const models = require("../models");

const User = models.user;

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const verifyUser = await User.findOne({ where: { email } });
    if (verifyUser) {
      const verifyPassword = bcrypt.compareSync(password, verifyUser.password);
      if (verifyPassword) {
        const token = jwt.sign({ userId: verifyUser.id }, "my-token-key");
        const data = {
          email: verifyUser.email,
          status: verifyUser.status,
          token
        };
        res.status(200).send({
          message: "your login successfully",
          status: 200,
          data
        });
      } else {
        res.status(401).send({ message: "Invalid Password", status: 401 });
      }
    } else {
      res.status(401).send({ message: "Invalid email", status: 401 });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.register = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      name,
      gender,
      phone,
      address
    } = req.body;
    hash = bcrypt.hashSync(password, 10);
    const verifyUser = await User.findOne({ where: { email } });
    if (!verifyUser) {
      const data = await User.create({
        username,
        email,
        password,
        name,
        status: false,
        gender,
        phone,
        address
      });
      if (data) {
        const token = jwt.sign({ userId: data.id }, "my-token-key");
        res.status(200).send({
          message: "Register Successfully",
          email: data.email,
          status: data.status,
          token
        });
      } else {
        res.status(400).send({
          message: "Register Not Successfully",
          status: 400,
          data
        });
      }
    } else {
      res.status(409).send({
        message: "conflicked email has detected in server",
        status: 409
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.show = async (req, res) => {
  try {
    const userId = req.user.userId;
    const data = await User.findOne({
      where: { id: userId }
    });
    res.status(200).send({
      message: "your data",
      data
    });
  } catch (error) {
    console.log(error);
  }
};
