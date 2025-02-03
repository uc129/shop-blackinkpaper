import { NextResponse } from "next/server";
import { ProductModel } from "./model";
import connect from "../db-config";

export async function GET() {
    await connect()
    try {
        const products = await ProductModel.find({});
        return NextResponse.json({ message: 'Products retrieved', status: 200, products });
    }
    catch (error) {
        return NextResponse.json({ message: 'Error retrieving products', status: 500, error });
    }
}

export async function POST(req: Request) {
    await connect()
    try {
        const body = await req.json();
        const product = await ProductModel.create(body);
        return NextResponse.json({ message: 'Product created', status: 201, product });
    }
    catch (error) {
        return NextResponse.json({ message: 'Error creating product', status: 500, error });
    }
}

export async function PUT(req: Request) {
    await connect()
    const url = new URL(req.url)
    const id = url.searchParams.get("id")
    console.log('id', id);

    try {
        const body = await req.json();
        const product = await ProductModel.findByIdAndUpdate(id, body, { new: true });
        return NextResponse.json({ message: 'Product updated', status: 201, product });
    }
    catch (error) {
        return NextResponse.json({ message: 'Error updating product', status: 500, error });
    }
}

export async function DELETE(req: Request) {
    await connect()
    const url = new URL(req.url)
    const id = url.searchParams.get("id")
    console.log('id', id);

    try {
        const product = await ProductModel.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Product deleted', status: 200, product });
    }
    catch (error) {
        return NextResponse.json({ message: 'Error deleting product', status: 500, error });
    }
}

