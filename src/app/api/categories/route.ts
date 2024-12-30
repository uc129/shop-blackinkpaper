import { NextRequest, NextResponse } from "next/server";
import { ProductCategoryModel } from "./model";
import connect from "../db-config";




export async function GET() {
    await connect()
    try {
        const categories = await ProductCategoryModel.find({});
        console.log('categories', categories);

        return NextResponse.json({ message: 'Categories retrieved', status: 200, categories });
    }
    catch (error) {
        return NextResponse.json({ message: 'Error retrieving categories', status: 500, error });
    }
}




export async function POST(req: NextRequest) {

    const { title, description, image_urls, imageData } = await req.json();

    const newCategory = new ProductCategoryModel({
        title,
        description,
        image_urls,
        imageData
    });

    try {
        const savedCategory = await newCategory.save();
        return NextResponse.json({ message: 'Category created', status: 201, category: savedCategory });
    } catch (error) {
        return NextResponse.json({ message: 'Error creating category', status: 500, error });
    }

}

export async function PUT(req: NextRequest) {
    const { _id, title, description, image_urls, imageData } = await req.json();

    try {
        const updatedCategory = await ProductCategoryModel.findByIdAndUpdate(_id, {
            title,
            description,
            image_urls,
            imageData
        }, { new: true });
        return NextResponse.json({ message: 'Category updated', status: 200, category: updatedCategory });
    } catch (error) {
        return NextResponse.json({ message: 'Error updating category', status: 500, error });
    }
}