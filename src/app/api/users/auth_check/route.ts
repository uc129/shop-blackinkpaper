import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "../model";
import connect from "../../db-config";


export async function POST(req: NextRequest) {
    await connect()
    let { email } = await req.json();
    console.log(email);

    const token = req.cookies.get('authToken');
    if (!token) {
        return NextResponse.json({ auth: false, status: 401, message: 'Unauthorized' });
    }

    try {
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return NextResponse.json({ auth: false, status: 401, message: 'User not found' });
        }
        return NextResponse.json({ auth: true, status: 200, message: 'Authorized', user });

    }
    catch (error) {
        return NextResponse.json({ auth: false, status: 401, message: 'Unauthorized' });
    }


}