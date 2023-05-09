const bcrypt = require("bcryptjs");

const users = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john@test.com",
    password: bcrypt.hashSync("chafo123", 10),
  },
  {
    firstName: "Bob",
    lastName: "Ross",
    email: "bob@test.com",
    password: bcrypt.hashSync("chafo123", 10),
  },
  {
    firstName: "Sarah",
    lastName: "Connor",
    email: "sarah@test.com",
    password: bcrypt.hashSync("chafo123", 10),
  },
];

module.exports = users;
