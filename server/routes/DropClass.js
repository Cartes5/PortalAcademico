const express = require("express");
const router = express.Router();
const {
  dropClassHandler,
  deleteClassHandler,
} = require("../controllers/DropClass");
// CLASE DE SALIDA DEL ESTUDIANTE
const dropClass = router.put("/api/student/classes/delete", dropClassHandler);

// PRUEBA: PROFESOR ELIMINAR CLASE
const deleteClass = router.delete(
  "/api/teacher/classes/delete",
  deleteClassHandler
);

module.exports = { dropClass, deleteClass };