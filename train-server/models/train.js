"use strict";
module.exports = (sequelize, DataTypes) => {
  const train = sequelize.define(
    "train",
    {
      name: DataTypes.STRING,
      typeTrainId: DataTypes.INTEGER,
      dateStart: DataTypes.DATEONLY,
      station: DataTypes.STRING,
      startTime: DataTypes.TIME,
      detinationStation: DataTypes.STRING,
      arrivalTime: DataTypes.TIME,
      price: DataTypes.INTEGER,
      qty: DataTypes.INTEGER
    },
    {}
  );
  train.associate = function(models) {
    train.belongsTo(models.typetrain, {
      foreignKey: "typeTrainId"
    });
  };
  return train;
};
