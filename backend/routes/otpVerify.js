import "dotenv/config";
import express from "express";
import nodemailer from "nodemailer";
const router = express.Router();

router.post("/", async (req, res) => {
  const { email } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: "gtanvir131@gmail.com",
        pass: "eafy wyzc qsnk xhkd",
      },
    });

    const otp = Math.floor(Math.random() * 10000);
    console.log(otp); //otp gen hoise ekhn eta forget e pathate hbe

    const reciever = {
      from: "akon.pt33@gmail.com",
      to: email,
      subject: "Megamart otp",
      text: `your otp for megamart is ${otp}`,
    };
    const info = transporter.sendMail(reciever, (err, response) => {
      if (err)
        res.send({
          success: false,
          error: true,
          data: err || err.message,
        });
      else {
        res.send({
          otp: otp,
          success: true,
          error: false,
          data: response,
        });
      }
    });
  } catch (error) {
    res.send({
      success: false,
      error: true,
      data: error || error.message,
    });
  }
});

export default router;
