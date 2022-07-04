const { Class } = require("../models/models");

const dropClassHandler = (req, res) => {
  const { classId, userId } = req.body;
  Class.find({ _id: classId }, async (err, doc) => {
    if (err) {
      res.status(500).json({ message: "Se produjo un error del servidor, inténtelo de nuevo" });
    } else {
      if (doc.length > 0) {
        let update = await doc[0].roster.filter((obj) => obj._id !== userId);
        doc[0].roster = update;
        doc[0].save((err, doc) => {
          err
            ? res
                .status(500)
                .json({ message: "Se produjo un error del servidor, inténtelo de nuevo" })
            : res.status(200).json({ message: "Abandonado" });
        });
      } else {
        res.status(404).json({ msg: "La clase ya no existe" });
      }
    }
  });
};

const deleteClassHandler = (req, res) => {
  const { classId } = req.body;
  Class.findByIdAndDelete({ _id: classId }, (err, succ) => {
    err
      ? res.status(500).json({ message: "Se produjo un error del servidor, inténtelo de nuevo" })
      : res.status(200).json({ message: "Borrado" });
  });
};

module.exports = { dropClassHandler, deleteClassHandler };