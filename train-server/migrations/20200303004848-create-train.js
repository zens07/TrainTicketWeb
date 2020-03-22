"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("trains", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      typeTrainId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "typetrains",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      dateStart: {
        type: Sequelize.DATEONLY
      },
      station: {
        type: Sequelize.STRING
      },
      startTime: {
        type: Sequelize.TIME
      },
      detinationStation: {
        type: Sequelize.STRING
      },
      arrivalTime: {
        type: Sequelize.TIME
      },
      price: {
        type: Sequelize.INTEGER
      },
      qty: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("trains");
  }
};
