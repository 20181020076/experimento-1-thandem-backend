import express from "express";
import http from "http";
import cors from "cors";
import "dotenv/config";
import { Server as SocketServer } from "socket.io";
import jwt from "jsonwebtoken";
// import { saveData } from "./db/mongo.js";
// import Sala from "./models/Sala.js";

const PORT = process.env.PORT_SERVER;

const app = express();
const secretKey = process.env.SECRET_KEY;

const rooms = [1, 2, 3];

app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: process.env.PAGE_URL,
  },
});
io.on("connection", (socket) => {
  socket.on("JoinRoom", (room) => {
    socket.join(room);

    io.in(room).emit("newUser", "new player has joine the "+ room)
  });
  socket.on("chatMessage", ({ room, message }) => {
    io.to(room).emit("message", message);
  });

  // socket.emit("message",()=>{

  // })
  // socket.on("joinRoom",({userName, sala})=>{
  //   console.log(userName,sala)
  //   socket.join(sala)
  //   socket.on("message", (body) => {
  //     io.to(sala).emit("message", {
  //       body,

  //     });
  //   });
  //   socket.broadcast.to(`${sala}`).emit("message",`${userName} se ha unido al chat`)
  // })
});

app.post("/", async (req, res) => {
  try {
    const token = jwt.sign(
      { userName: req.body.user, sala: req.body.sala },
      secretKey,
      { expiresIn: "1h" }
    );
    res.json({
      status: "ok",
      redirectUrl: `${process.env.PAGE_URL}/componentes`,
      token,
    });
  } catch (err) {
    res.json({ error: err });
  }
});
app.get(`/home`, async (req, res) => {
  console.log(req);
  res.send(console.log("ok"));
});

server.listen(PORT, () => {
  console.log(`Puerto montado en el ${PORT}`);
});
