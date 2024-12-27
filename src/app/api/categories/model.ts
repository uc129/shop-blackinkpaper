import mongoose, { Schema } from 'mongoose';





export type ProductCategory = {
    title: string;
    description: string;
    image_urls: string[];
    imageData: [{
        publicId: string;
        url: string;
        secure_url: string;
        original_filename: string;
    }]
}

const ProductCategorySchema = new Schema<ProductCategory>({
    title: { type: String, },
    description: { type: String, },
    image_urls: { type: [String], },
    imageData: [{
        publicId: { type: String, },
        url: { type: String, },
        secure_url: { type: String, },
        original_filename: { type: String, required: false },
    }],
});


const ProductCategoryModel = mongoose.model('ProductCategory', ProductCategorySchema);

export { ProductCategoryModel, ProductCategorySchema };
