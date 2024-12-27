



import mongoose, { Schema } from "mongoose";


export type ProductType = {

    title: string;
    description: string;
    category: Schema.Types.ObjectId[] | string[];
    features: {
        title: string;
        description: string;
    }[]
    tools: {
        title: string;
        description: string;
    }[],

    tagline: string;
    notes: {
        title: string;
        description: string;
    }[],
    image_urls: string[];
    imageData: [{
        publicId: string;
        url: string;
        secure_url: string;
        original_filename: string;
    }]
};


const ProductSchema = new Schema<ProductType>({
    title: { type: String, },
    description: { type: String, },
    category: { type: [Schema.Types.ObjectId], ref: "Category", required: true },
    features: [{
        title: { type: String, },
        description: { type: String, }
    }],
    tools: [{
        title: { type: String, },
        description: { type: String, }
    }],
    notes: [{
        title: { type: String, },
        description: { type: String, }
    }],
    tagline: { type: String, },
    image_urls: { type: [String], },
    imageData: [{
        publicId: { type: String, },
        url: { type: String, },
        secure_url: { type: String, },
        original_filename: { type: String, required: false },
    }],

}, { timestamps: true });



const Product = mongoose.model<ProductType>("Product", ProductSchema);

export { Product, ProductSchema };




