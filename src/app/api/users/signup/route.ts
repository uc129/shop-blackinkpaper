import { NextRequest, NextResponse } from "next/server";




export async function POST(req: NextRequest, res: NextResponse) {
    const body = await req.json();
    console.log(body);
    return NextResponse.json({ message: 'POST request to the signup route', });
}