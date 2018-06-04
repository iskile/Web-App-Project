var socketio = require("socket.io");

module.exports = {
  connectToHTTP
};

function connectToHTTP(httpServer) {
  var io = httpServer;
  io.origins("*:*");

  io.on("connection", function(socket) {
    console.log("a user connected");
    setTimeout(function() {
      socket.emit("notification", {
        message: "asdas",
        type: "success|error|warning|info"
      });
    }, 3000);
  });
}
