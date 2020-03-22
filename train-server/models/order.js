"use strict";
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define(
    "order",
    {
      userId: DataTypes.INTEGER,
      trainId: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      totalPrice: DataTypes.INTEGER,
      status: DataTypes.STRING,
      attacment: DataTypes.STRING
    },
    {}
  );
  order.associate = function(models) {
    // associations can be defined here
    order.belongsTo(models.user, {
      foreignkey: "userId"
    });
    order.belongsTo(models.train, {
      foreignkey: "trainId"
    });
  };
  return order;
};
