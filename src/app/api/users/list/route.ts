import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "../model";
import connect from "../../db-config";



export async function GET(req: NextRequest) {

    connect();
    try {
        const users = await UserModel.find();
        return NextResponse.json({
            status: 200,
            data: users
        });
    }
    catch (err) {
        console.error(err);
        NextResponse.json({
            status: 500,
            data: 'Server Error'
        });

    };
}

