const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  name: String,
  brand: String,
  quantity: {
    type: Number,
    required: true,
    min:[6,"Atleast 6 units required"]

  }
//   quantity: Number;
//   quantity: { type : Number, required: true }
});

module.exports = mongoose.model("harshit", dataSchema);
