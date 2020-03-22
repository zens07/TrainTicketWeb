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
      "typetrains",
      [
        {
          name: "express",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "ekonomi",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "bisnis",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "eksekutif",
          createdAt: new Date(),
          updatedAt: new Date()
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
    return queryInterface.bulkDelete("typetrains", null, {});
  }
};
