const mongoose = require("mongoose");
const validator = require("validator");

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    maxlength: 20,
  },

  age: {
    type: Number,
    required: [true, "Please provide an age"],
    min: 0,
    max: 99,
  },
  guardianName: {
    type: String,
    required: [true, "Please provide a name"],
    maxlength: 20,
  },
  guardianPhone: {
    type: String,
    required: [true, "Please provide a number"],
    maxlength: 13,
  },
  guardianEmail: {
    type: String,
    unique: true,
    required: [true, "Please provide an email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
  },
});

module.exports = mongoose.model("Player", PlayerSchema);
