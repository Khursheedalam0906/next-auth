import { DbConnection } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

DbConnection();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    // validation
    console.log(reqBody);
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exist" },
        { status: 400 }
      );
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashPassword });
      const saveUser = await newUser.save();
      console.log(saveUser);

      //send email verification
      await sendEmail({ email, emailType: "VERIFY", userId: saveUser._id });
      return NextResponse.json({
        message: "User register successfully",
        success: true,
        saveUser,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
