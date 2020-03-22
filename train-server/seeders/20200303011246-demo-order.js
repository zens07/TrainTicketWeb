"use strict";

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
      "orders",
      [
        {
          userId: 2,
          trainId: 2,
          price: 15000,
          qty: 2,
          totalPrice: 15000 * 2,
          status: "approved",
          attacment: "buktiPemayaran1.jpg"
        },
        {
          userId: 3,
          trainId: 1,
          price: 15000,
          qty: 2,
          totalPrice: 15000 * 2,
          status: "pending",
          attacment: "buktiPemayaran2.jpg"
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
    return queryInterface.bulkDelete("orders", null, {});
  }
};
