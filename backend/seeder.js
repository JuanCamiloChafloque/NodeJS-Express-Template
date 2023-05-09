const mongoose = require("mongoose");
const dotenv = require("dotenv");
const users = require("./data/users");
const User = require("./models/User");
const db = require("./db/database");

dotenv.config();
db();

const importData = async () => {
  try {
    await User.deleteMany({});
    await User.insertMany(users);
    console.log("Data imported to DB...");
    process.exit(0);
  } catch (err) {
    console.log("Failed to import to DB...");
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany({});

    console.log("Data deleted to DB...");
    process.exit(0);
  } catch (err) {
    console.log("Failed to delete to DB...");
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
