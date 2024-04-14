import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //TODO: configure mail for usage
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "4380bdca7d1c54",
        pass: "5cefbc930f40bc",
      },
    });

    const mailOptions = {
      from: "khursheedalam0906@gmail.com", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to 
      ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy and paste 
      the link below in your browser.<br>${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}</p>`, // html body
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
    //
  } catch (error: any) {
    throw new Error(error.message);
  }
};
