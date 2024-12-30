



import { ImageData } from "@/app/components/buttons/upload-image-button";
import mongoose, { Schema } from "mongoose";


export type ProductType = {
    _id: Schema.Types.ObjectId;
    title: string;
    description: string;
    category: Schema.Types.ObjectId[];
    price: number;
    discount: number;
    price_currency: string;
    product_type: string;

    price_after_discount: number;
    sell_count: number;

    isFeatured: boolean;
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
    imageData: ImageData[];
    createdAt: Date;
    updatedAt: Date;
};

export enum ProductTypeEnum {
    ROLLED = "rolled",
    FRAMED = "framed",
    STICKER = "sticker",
    MERCHANDISE = "merchandise"
}


const ProductSchema = new Schema<ProductType>({
    title: { type: String, },
    description: { type: String, },
    category: { type: [Schema.Types.ObjectId], ref: "Category", required: true },
    features: [{
        title: { type: String, },
        description: { type: String, }
    }],
    discount: { type: Number, },
    price: { type: Number, },
    price_after_discount: { type: Number, },
    price_currency: { type: String, },
    product_type: { type: String, enum: ["rolled", "framed", "sticker", "merchandise"], default: "rolled" },
    sell_count: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },

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
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }

}, { timestamps: true });



const ProductModel = mongoose.models['Product'] || mongoose.model<ProductType>("Product", ProductSchema);

export { ProductModel, ProductSchema };




