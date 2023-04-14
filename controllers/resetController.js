const Member = require("../model/User");
const Token = require("../model/Token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const handleResetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const foundUser = await Member.findOne({ emailId: email }).exec();
    if (!foundUser) return res.sendStatus(401);
    const token = crypto.randomBytes(20).toString("hex");
    // let foundToken = await Token.findOne({ userId: foundUser._id }).exec();

    await Token.create({
      userId: foundUser._id,
      token: token,
      createdTime: Date.now(),
      expires: Date.now() + 3600000,
    });

    const link = `${process.env.BASE_URL}/LoginSystem_Mern/#/LoginSystem_Mern/ResetNewPassword/${foundUser._id}/${token}`;
    await sendEmail.sendmail(foundUser.emailId, "Password Reset Link", link);
    return res.send("Password reset link sent to your email");
  } catch (error) {
    console.log(error);
    return res.send("An error occured");
  }
};
module.exports = { handleResetPassword };
