import { NextRequest, NextResponse } from "next/server";
import { UserModel, UserType } from "../model";
import { cookies } from "next/headers";
import { checkAuth } from "../../helpers/check-auth";




export async function GET(req: NextRequest) {

    const url = new URL(req.url)
    const id = url.searchParams.get("id");
    if (!id) {
        return NextResponse.json({ message: 'Id is required', status: 400 });
    }

    try {
        const auth = await checkAuth(req, 'authToken');
        if (!auth) {
            return NextResponse.json(
                {
                    status: 401,
                    message: 'Unauthorized'
                })
        }
        const user = await UserModel.findById({ _id: id }).select('-password');
        return NextResponse.json({ message: 'User retrieved', status: 200, user });
    }
    catch (err) {
        return NextResponse.json({
            message: 'Error retrieving user, Internal sever error',
            status: 500,
            error: err
        })
    }
}

export async function PUT(req: NextRequest) {
    const url = new URL(req.url)
    const id = url.searchParams.get("id");

    if (!id) {
        return NextResponse.json({ message: 'Id is required', status: 400 });
    }
    try {
        const auth = await checkAuth(req, 'authToken');
        if (!auth) {
            return NextResponse.json(
                {
                    status: 401,
                    message: 'Unauthorized'
                })
        }
        const body = await req.json();
        const user: UserType | null = await UserModel.findByIdAndUpdate(id, body, { new: true });
        return NextResponse.json({ message: 'User updated', status: 201, user });
    }
    catch (err) {
        return NextResponse.json({
            message: 'Error updating user, Internal sever error',
            status: 500,
            error: err
        })
    }

}

export async function DELETE(req: NextRequest) {
    const url = new URL(req.url)
    const id = url.searchParams.get("id");
    if (!id) {
        return NextResponse.json({ message: 'Id is required', status: 400 });
    }
    try {
        const user = await UserModel.findByIdAndDelete(id);
        return NextResponse.json({ message: 'User deleted', status: 200, user });
    }
    catch (err) {
        return NextResponse.json({
            message: 'Error deleting user, Internal sever error',
            status: 500,
            error: err
        })
    }
}