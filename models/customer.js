const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  city: {
    type: String,
  },
  contactNumber: {
    type: String,
  },
  status: {
    type: String,
  },
  category: {
    type: String,
  },
});

module.exports = mongoose.model("Customer", customerSchema);
