const Member = require("../model/User");
const Token = require("../model/Token");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const handleUpdatePassword = async (req, res) => {
  const { id, resetToken, password } = req.body;

  try {
    const foundToken = await Token.findOne({
      userId: id,
      token: resetToken,
    }).exec();
    if (!foundToken) return res.sendStatus(404);
    const foundUser = await Member.findOne({ _id: id }).exec();
    if (!foundUser) return res.sendStatus(401);
    const hashedPwd = await bcrypt.hash(password, 10);
    const updated = await Member.updateOne(
      { _id: id },
      { $set: { password: hashedPwd } }
    );
    //console.log(updated);

    //console.log(updated);
    res.status(201).json({ success: `New Password updated ` });
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
};

module.exports = { handleUpdatePassword };
