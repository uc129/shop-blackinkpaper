import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "../model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connect from "../../db-config";
import { cookies } from 'next/headers'




export async function POST(req: NextRequest) {
    await connect();
    const { username, email, password } = await req.json();
    if ((!username && !email) || !password) {
        return NextResponse.json({ error: "Username or email and password is required" }, { status: 400 });
    }

    // Check if user exists
    const user = await UserModel.findOne({ $or: [{ username }, { email }] });
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return NextResponse.json({ error: "Password is incorrect" }, { status: 400 });
    }

    // Generate token
    const tokenData = {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
    }

    const signedToken = jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, { expiresIn: "1d" });
    user.authToken = signedToken;
    user.tokenExpiration = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await user.save();

    let res = NextResponse.json({ token: signedToken, user: tokenData, status: 200 });
    const cookieStore = await cookies();
    cookieStore.set('authToken', signedToken, { expires: user.tokenExpiration });
    cookieStore.set('role', user.role, { expires: user.tokenExpiration });

    return res;


    return res;

}