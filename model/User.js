const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  roles: {
    User: {
      type: Number,
      default: 1111,
    },

    Editor: Number,
    Admin: Number,
  },
  refreshToken: String,
});
module.exports = mongoose.model("Member", memberSchema);
