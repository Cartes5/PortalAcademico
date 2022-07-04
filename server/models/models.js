const mongoose = require("mongoose");

// PROFESOR SCHEMA

const teacherSchema = new mongoose.Schema({
  fName: { type: String, required: true, trim: true, lowercase: true },
  lName: { type: String, required: true, trim: true, lowercase: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  password: { type: String, required: true, trim: true },
  role: { type: String, required: true, default: "Profesor" },
  classes: { type: Array, required: true, default: [] },
  subscribed: { type: Boolean, default: false },
});

const Teacher = new mongoose.model("Profesor", teacherSchema);

// ALUMNOS SCHEMA

const studentSchema = new mongoose.Schema({
  fName: { type: String, required: true, trim: true, lowercase: true },
  lName: { type: String, required: true, trim: true, lowercase: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  password: { type: String, required: true, trim: true },
  role: { type: String, required: true, default: "Alumno" },
  classes: { type: Array, required: true, default: [] },
});

const Student = new mongoose.model("Alumno", studentSchema);

// CLASSES SCHEMA

const classSchema = new mongoose.Schema({
  className: { type: String, required: true, trim: true, lowercase: true },
  teacherId: { type: String, required: true, trim: true },
  secretKey: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  assignments: { type: Array, default: [] },
  whoTeach: Object,
  roster: { type: Array, default: [] },
  messages: { type: Array, default: [] },
});

const Class = new mongoose.mongoose.model("Class", classSchema);
