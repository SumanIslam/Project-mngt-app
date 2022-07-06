const mongoose = require('mongoose');
const colors = require("colors");

require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI

mongoose.connection.once('open', () => {
  console.log('Mongodb connection is ready'.cyan.underline.bold);
})
mongoose.connection.on('error', (err) => {
  console.log(`${err}`.red.underline.bold);
})


async function mongoConnect() {
  await mongoose.connect(MONGO_URI);
}
async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect
}