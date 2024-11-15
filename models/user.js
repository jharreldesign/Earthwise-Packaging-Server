const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  address: [
    {
      street: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: Number, required: true },
    },
  ],
  companyName: {
    type: String,
    required: true,
  }
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  },
});

module.exports = mongoose.model("User", userSchema);
