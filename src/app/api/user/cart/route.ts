import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "../../helpers/check-auth";
import { UserModel } from "../../users/model";
import { CartItemType, CartType } from "./model";
import connect from "../../db-config";
import { Schema } from "mongoose";




export async function POST(req: NextRequest) {
    await connect();
    const url = new URL(req.url);
    const userId = url.searchParams.get('user');
    if (!userId) {
        return NextResponse.json({ message: 'User Id is required', status: 400 });
    }
    try {
        const auth = await checkAuth(req, 'authToken');
        if (!auth) {
            return NextResponse.json({ status: 401, message: 'Unauthorized' });
        }
        const { productId, quantity, price, total, size, frame, material }: CartItemType = await req.json();
        const user = await UserModel.findById(userId);
        if (!user) {
            return NextResponse.json({ message: 'User not found', status: 404 });
        }
        const cart = user.cart;
        const itemIndex = cart.items.findIndex((item: CartItemType) =>
            String(item.productId) === String(productId)
            && item.size.size === size.size
            && item.frame.frame === frame.frame
            && item.material.material === material.material
        );

        if (itemIndex === -1) {
            cart.items.push({
                productId,
                quantity,
                price,
                total,
                size: {
                    size: size.size,
                    priceJump: size.priceJump
                },
                frame: {
                    frame: frame.frame,
                    priceJump: frame.priceJump
                },
                material: {
                    material: material.material,
                    priceJump: material.priceJump
                }
            });
            cart.totalItems = cart.totalItems + quantity;
            cart.grandTotal = cart.grandTotal + total;
            await user.save();
            return NextResponse.json({ message: 'New Item added to cart', status: 200, cart: user.cart });
        }
        else {
            cart.items[itemIndex].quantity += quantity;
            cart.items[itemIndex].total += total;
            cart.totalItems += quantity;
            cart.grandTotal += total;
            if (cart.totalItems < 0) cart.totalItems = 0;
            if (cart.grandTotal < 0) cart.grandTotal = 0;
            await user.save();
            return NextResponse.json({ message: 'Item quantity updated', status: 200, cart: user.cart });
        }
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({
            message: 'Error adding to cart, Internal sever error',
            status: 500,
            error: err
        })
    }
}



export async function PATCH(req: NextRequest) {
    await connect();
    const url = new URL(req.url);
    const userId = url.searchParams.get('user');
    if (!userId) {
        return NextResponse.json({ message: 'User Id is required', status: 400 });
    }
    try {
        const auth = await checkAuth(req, 'authToken');
        if (!auth) {
            return NextResponse.json({ status: 401, message: 'Unauthorized' });
        }
        const { itemId }: { itemId: string } = await req.json();

        const user = await UserModel.findById(userId);
        if (!user) {
            return NextResponse.json({ message: 'User not found', status: 404 });
        }
        const cart = user.cart;

        const itemIndex = cart.items.findIndex((item: CartItemType) => String(item._id) == itemId);
        console.log('itemIndex', itemIndex)
        if (itemIndex === -1) {
            return NextResponse.json({ message: 'Item not found in cart', status: 404 });
        }

        const item = cart.items[itemIndex];
        cart.totalItems -= item.quantity;
        cart.grandTotal -= item.total;
        if (cart.totalItems < 0) cart.totalItems = 0;
        if (cart.grandTotal < 0) cart.grandTotal = 0;
        cart.items = cart.items.filter((item: CartItemType) => String(item._id) !== itemId);
        await user.save();
        return NextResponse.json({ message: 'Item removed from cart', status: 200, cart: user.cart });
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({
            message: 'Error removing item from cart, Internal sever error',
            status: 500,
            error: err
        })
    }
}



export async function PUT(req: NextRequest) {
    await connect();

    const url = new URL(req.url);
    const userId = url.searchParams.get('user');
    if (!userId) {
        return NextResponse.json({ message: 'User Id is required', status: 400 });
    }
    try {
        const auth = await checkAuth(req, 'authToken');
        if (!auth) {
            return NextResponse.json({ status: 401, message: 'Unauthorized' });
        }

        const { itemId, quantity } = await req.json();
        const user = await UserModel.findById(userId);
        if (!user) {
            return NextResponse.json({ message: 'User not found', status: 404 });
        }
        const cart = user.cart;
        const itemIndex = cart.items.findIndex((item: CartItemType) => String(item._id) == itemId);
        if (itemIndex === -1) {
            return NextResponse.json({ message: 'Item not found in cart', status: 404 });
        }
        const item = cart.items[itemIndex];
        const oldTotal = item.total;
        const oldQuantity = item.quantity;
        item.quantity = quantity;
        item.total = item.price * quantity;
        cart.totalItems = cart.totalItems - oldQuantity + quantity;
        cart.grandTotal = cart.grandTotal - oldTotal + item.total;

        if (cart.totalItems < 0) cart.totalItems = 0;
        if (cart.grandTotal < 0) cart.grandTotal = 0;

        await user.save();
        return NextResponse.json({ message: 'Item Quantity updated', status: 200 });
    }
    catch (err) {
        return NextResponse.json({
            message: 'Error updating cart, Internal sever error',
            status: 500,
            error: err
        })
    }
}



export async function DELETE(req: NextRequest) {
    await connect();

    const url = new URL(req.url);
    const userId = url.searchParams.get('user');
    if (!userId) {
        return NextResponse.json({ message: 'User Id is required', status: 400 });
    }
    try {
        const auth = await checkAuth(req, 'authToken');
        if (!auth) {
            return NextResponse.json({ status: 401, message: 'Unauthorized' });
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return NextResponse.json({ message: 'User not found', status: 404 });
        }
        user.cart = { items: [], grandTotal: 0, totalItems: 0 };
        await user.save();
        return NextResponse.json({ message: 'Cart cleared', status: 200 });
    }
    catch (err) {
        return NextResponse.json({
            message: 'Error clearing cart, Internal sever error',
            status: 500,
            error: err
        })
    }
}