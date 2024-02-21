import mongoose from "mongoose";
import {User} from "@/app/models/User";
import {NextResponse} from "next/server";
import crypto from "crypto";

export const POST = async (req: any) => {
    const {email} = await req.json()

    await mongoose.connect(String(process.env.MONGO_URL));

    const existingUser = await User.findOne({email})

    if (!existingUser) {
        return new NextResponse("Email doesn't exists", {status: 400})
    }

    const resetToken = crypto.randomBytes(20).toString('hex')
    const passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')

    const passwordResetExpires = Date.now() + 3600000

    existingUser.resetToken = passwordResetToken
    existingUser.resetTokenExpiry = passwordResetExpires

    const resetUrl = `localhost:3000/reset-password/${resetToken}`

    console.log(resetUrl)
}
