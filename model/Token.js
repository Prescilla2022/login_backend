const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Member",
  },
  token: {
    type: String,
    required: true,
    red: true,
  },
  createdTime: {
    type: Date,
    default: Date.now(),
    expires: 3600,
  },
});
module.exports = mongoose.model("Token", tokenSchema);
