import { NextRequest, NextResponse } from "next/server";
import connect from "../../db-config";
import bcrypt from 'bcrypt'
import { UserModel, UserType } from "../model";

export async function POST(req: NextRequest) {
    await connect();
    const body = await req.json();

    console.log(body);
    const { username, email, phone, password, role, imageData, image_urls } = body;
    if (!username || !email || !password || !role) {
        return NextResponse.json({ message: 'Please provide all required fields', });
    }

    let hashedPassword = bcrypt.hashSync(password, 10);
    try {
        const user = await UserModel.create({
            username,
            email,
            phone,
            password: hashedPassword,
            role,
            imageData,
            image_urls
        })
        return NextResponse.json({ message: 'Signup Successful', user, status: 200 });
    }
    catch (err) {
        return NextResponse.json({ message: 'Signup Failed', });
    }
}