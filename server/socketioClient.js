const socketIo = require("socket.io");
const { server } = require("./httpsServer");

const io = socketIo(server);

module.exports = {
  io,
};
