"use strict";

const today = new Date();
const date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert(
      "trains",
      [
        {
          name: "kosambiexpress",
          typeTrainId: 2,
          dateStart: "2020-03-11",
          station: "Juramangu",
          startTime: "07:00:00",
          detinationStation: "bekasi",
          arrivalTime: "01:00:00",
          price: 15000,
          qty: 100
        },
        {
          name: "JWT Express",
          typeTrainId: 1,
          dateStart: "2020-03-11",
          station: "Manggarai",
          startTime: "07:00:00",
          detinationStation: "bogor",
          arrivalTime: "01:00:00",
          price: 15000,
          qty: 100
        },
        {
          name: "JWT Express",
          typeTrainId: 1,
          dateStart: date,
          station: "bogor",
          startTime: "07:00:00",
          detinationStation: "jakarta",
          arrivalTime: "01:00:00",
          price: 15000,
          qty: 100
        },
        {
          name: "JWT Express",
          typeTrainId: 1,
          dateStart: date,
          station: "cirebon",
          startTime: "07:00:00",
          detinationStation: "jakarta",
          arrivalTime: "01:00:00",
          price: 15000,
          qty: 100
        },
        {
          name: "JWT Express",
          typeTrainId: 1,
          dateStart: date,
          station: "jakarta",
          startTime: "07:00:00",
          detinationStation: "cirebon",
          arrivalTime: "01:00:00",
          price: 15000,
          qty: 100
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("trains", null, {});
  }
};
