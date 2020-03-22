// const Sequelize = require("sequelize");
const express = require("express");
require("express-group-routes");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./images",
  filename: function(req, file, cb) {
    console.log(file);
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  }
});

const upload = multer({
  storage: storage
}).single("uploadImage");

const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");

const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use(express.static("images"));

const { authenticated } = require("./middleware");
//controllers
const userController = require("./controllers/usersController");
const orderUserController = require("./controllers/orderUserController");
const orderAdminController = require("./controllers/orderAdminController");
const trainController = require("./controllers/trainController");

app.group("/api/v1", router => {
  router.post("/upload", function(req, res) {
    upload(req, res, err => {
      if (err) throw err;
      const data = {
        orderId: req.body.orderId,
        file: req.file.filename
      };
      res.send({
        data
      });
    });
  });

  router.post("/auth/login", userController.login);
  router.post("/register", userController.register);
  router.get("/show/user", authenticated, userController.show);

  // only admin
  router.get("/index/admin/order", authenticated, orderAdminController.index);
  router.get("/show/admin/order/:id", authenticated, orderAdminController.show);
  router.patch(
    "/edit/admin/order/:id",
    authenticated,
    orderAdminController.edit
  );
  router.delete(
    "/delete/admin/order/:id",
    authenticated,
    orderAdminController.deleted
  );

  //contorller user order
  router.get("/index/user/order", authenticated, orderUserController.index);
  router.get("/show/user/order", authenticated, orderUserController.show);
  router.post("/insert/user/order", authenticated, orderUserController.insert);
  router.patch("/edit/user/order/:id", authenticated, orderUserController.edit);
  //find train
  router.post("/findtrain/station", trainController.findStation);
  router.post("/insert/admin/train", authenticated, trainController.insert);
});

app.listen(port, () => {
  console.log(`listen on port ${port} !!!`);
});
