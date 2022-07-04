const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
require("dotenv").config();
const socketio = require("socket.io");
const { Class } = require("./models/models");
// RUTAS:

const {
  logInTeacherRoute,
  registerTeacherRoute,
} = require("./routes/AuthTeacher");
const {
  loginStudentRoute,
  registerStudentRoute,
} = require("./routes/AuthStudent");
const {
  newClassTeacherRouter,
  enrollInClassRouter,
} = require("./routes/NewClass");
const {
  getClassesTeacherRoute,
  getClassesStudentRoute,
} = require("./routes/GetClasses");
const { dropClass, deleteClass } = require("./routes/DropClass");
const { addAssign, removeAssign } = require("./routes/Assignments");
const getSpecClasRoute = require("./routes/GetSpecClass");

const app = express();

// INTERMEDIOS

app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(
  session({
    secret: `${process.env.SECRET_STRING}`,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
  })
);

// BASE DE DATOS

mongoose.connect(`${process.env.DB_URI}`, (err) =>
  err ? console.log(err) : console.log("Connectado a DB")
);

// MANEJADORES DE RUTA

app.use("/", logInTeacherRoute);
app.use("/", registerTeacherRoute);
app.use("/", loginStudentRoute);
app.use("/", registerStudentRoute);
app.use("/", newClassTeacherRouter);
app.use("/", enrollInClassRouter);
app.use("/", getClassesTeacherRoute);
app.use("/", getClassesStudentRoute);
app.use("/", addAssign);
app.use("/", removeAssign);
app.use("/", dropClass);
app.use("/", deleteClass);
app.use("/", getSpecClasRoute);

// RUTAS NO MANEJADAS
app.get("*", (req, res) => {
  res.sendFile(
    express.static(path.resolve(__dirname, "../client/build", "index.html"))
  );
});

// SPIN SERVIDOR
const server = app.listen(process.env.PORT || 3009, () =>
  console.log("Servidor Spinning")
);

// SOCKET SERVIDOR
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("usuario conectado:", socket.id);

  // UNIÓN
  socket.on("join_room", (secretKey) => {
    socket.join(secretKey);
    console.log(socket.id, " has entered ", secretKey);
  });

  // MENSAJERÍA
  socket.on("enviar_mensaje", (data) => {
    console.log(data);

    // ENVÍO A OTROS USUARIOS EN EL MISMO CHAT
    socket.to(data.secretKey).emit("recibiendo_mensaje", data);

    // GUARDAR EN BD
    Class.find({ secretKey: data.secretKey }, async (err, doc) => {
      err ? console.log(err) : await doc[0].messages.push(data);
      let upDoc = doc[0];
      Class.findOneAndUpdate(
        { secretKey: data.secretKey },
        upDoc,
        { new: true, returnOriginal: false },
        (error, success) => {
          error ? console.log(error) : console.log("Actualizado");
        }
      );
    });
  });

  // SALIENDO DE SALA
  socket.on("dejar_chat", async (data) => {
    await socket.leave(data.secretKey);
    console.log("El usuario ha dejado la sala: ", data.secretKey);
  });

  // DESCONECTAR DEL SERVIDOR SOCKET
  socket.on("desconectado", () => {
    console.log("Usuario desconectado del servidor de socket", socket.id);
  });
});
