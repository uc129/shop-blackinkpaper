import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { UserModel } from "../model";


export async function POST(req: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get('authToken');
    try {
        const user = await UserModel.findOne({
            authToken: token?.value
        })
        if (!user) {
            return NextResponse.json({ auth: false, status: 401, message: 'User not found' });
        }
        user.authToken = '';
        user.tokenExpiration = new Date();
        await user.save();
        const userData = {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            authToken: user.authToken,
        }
        cookieStore.delete('authToken');
        return NextResponse.json({ status: 200, message: 'Logged out', user: userData });
    }
    catch (error) {
        return NextResponse.json({ auth: false, status: 401, message: 'Unauthorized' });
    }

}