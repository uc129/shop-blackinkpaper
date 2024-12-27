import mongoose, { Schema } from 'mongoose';

export type CartItemType = {
    productId: Schema.Types.ObjectId;
    quantity: number;
    price: number;
}

export type CartType = {
    items: CartItemType[];
    total: number;
    totalItems: number;
}


export type UserType = {
    username: string;
    email: string;
    password: string;
    role: string;
    image_urls: string[];
    cart: CartType;
    wishList: {
        items: Schema.Types.ObjectId[] | string[];
    }
    orders: Schema.Types.ObjectId[] | string[];
    imageData: [{
        publicId: string;
        url: string;
        secure_url: string;
        original_filename: string;
    }]
}

const UserSchema = new Schema<UserType>({
    username: { type: String, },
    email: { type: String, },
    password: { type: String, },
    role: { type: String, },

    cart: {
        items: [{
            productId: { type: Schema.Types.ObjectId, ref: 'Product', },
            quantity: { type: Number, },
            price: { type: Number, },
        }],
        total: { type: Number, },
        totalItems: { type: Number, },
    },

    wishList: {
        items: [{
            productId: { type: Schema.Types.ObjectId, ref: 'Product', },
        }],
    },

    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],



    image_urls: { type: [String], required: false },
    imageData: [{
        publicId: { type: String, required: false },
        url: { type: String, required: false },
        secure_url: { type: String, required: false },
        original_filename: { type: String, required: false },
    }],
});

const UserModel = mongoose.model<UserType>('User', UserSchema);


export { UserModel, UserSchema };