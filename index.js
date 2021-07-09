const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "./public");

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  console.log("New Websocket connection");

  socket.emit("message", "Welcome!");

  socket.on("sendMessage", (msg) => {
    io.emit("message", msg);
  });

  // socket.emit("countUpdated", count);
  // socket.on("increment", () => {
  //   count++;
  //   io.emit("countUpdated", count);
  // });
});

server.listen(port, () => {
  console.log(`Server start at port ${port}`);
});
