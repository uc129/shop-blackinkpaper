import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "../../users/model";



export async function POST(req: NextRequest) {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');
    console.log(userId)
    const { name, phone, building, street, city, state, country, postalCode, instructions, defaultAddress } = await req.json();
    if (!userId)
        return NextResponse.json({ status: 400, message: 'User Id is required' });

    try {
        const user = await UserModel.findById(userId);
        if (!user)
            return NextResponse.json({ status: 404, message: 'User not found' });

        const address = {
            name,
            phone,
            building,
            street,
            city,
            state,
            country,
            postalCode,
            instructions,
            default: defaultAddress
        }
        if (defaultAddress) {
            user.address.forEach((address) => {
                address.default = false;
            })
        }
        user.address.push(address);
        await user.save();
        return NextResponse.json({ status: 200, message: 'Address added' });
    }
    catch (error) {
        return NextResponse.json({ status: 500, message: error });
    }

}