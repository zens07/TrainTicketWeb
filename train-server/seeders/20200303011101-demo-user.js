"use strict";
const bcrypt = require("bcryptjs");

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
      "users",
      [
        {
          username: "zens07",
          email: "nurzaenimuhammad@gmail.com",
          password: bcrypt.hashSync("12345", bcrypt.genSaltSync(10)),
          status: 1,
          name: "Muhammad Nur Zaeni",
          gender: "Male",
          phone: "081772891204",
          address: "Kadipaten",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: "ris10",
          email: "risarisnawati10@gmail.com",
          password: bcrypt.hashSync("12345", bcrypt.genSaltSync(10)),
          status: 0,
          name: "Risa Risnawati",
          gender: "Female",
          phone: "0823171792189",
          address: "Jatiwangi",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: "entis",
          email: "entissutisna@gmail.com",
          password: bcrypt.hashSync("12345", bcrypt.genSaltSync(10)),
          status: 0,
          name: "Entis Sutisna",
          gender: "Male",
          phone: "081101083110",
          address: "Jakarta",
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
    return queryInterface.bulkDelete("users", null, {});
  }
};
