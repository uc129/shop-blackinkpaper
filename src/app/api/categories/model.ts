import mongoose, { Schema } from 'mongoose';
import { ImageData } from '@/app/components/buttons/upload-image-button';





export type ProductCategory = {
    _id?: Schema.Types.ObjectId;
    title: string;
    description: string;
    image_urls: string[];
    imageData: ImageData[];
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


// const ProductCategoryModel = mongoose.model('ProductCategory', ProductCategorySchema);
const ProductCategoryModel = mongoose.models?.ProductCategory || mongoose.model('ProductCategory', ProductCategorySchema);

export { ProductCategoryModel, ProductCategorySchema };
