import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3000 });

let allConnection = {};

wss.on("connection", (socket) => {
  console.log("User connected");
  socket.on("message", (e) => {
    const { type, roomId, message, senderId } = JSON.parse(e.toString());

    if (type === "join") {
      if (!allConnection[roomId]) {
        allConnection[roomId] = [socket];
      } else {
        allConnection[roomId].push(socket);
      }
    }

    if (type === "chat") {
      if (!message || !roomId) return;

      const payload = JSON.stringify({
        senderId,
        message,
      });

      allConnection[roomId]?.forEach((client) => {
        client.send(payload);
      });
    }
  });
});
