import mongoose, { Model, Schema } from 'mongoose';
import { CartSchema, CartType } from '../user/cart/model';
import { AddressSchema, AddressType } from '../user/address/model';



export type ImageDataType = {
    publicId: string,
    url: string,
    secure_url: string,
    original_filename: string
}



export type UserType = {
    username: string;
    email: string;
    phone: string;
    address: AddressType[]
    password: string;
    role: string;
    image_urls: string[];
    cart: CartType;
    authToken: string;
    tokenExpiration: Date;
    resetPasswordToken: string;
    resetPasswordTokenExpiration: Date;
    isVerified: boolean;
    wishList: { items: Schema.Types.ObjectId[] | string[]; }
    orders: Schema.Types.ObjectId[] | string[];
    imageData: ImageDataType[];
}

const UserSchema = new Schema<UserType>({
    username: { type: String, },
    email: { type: String, },
    password: { type: String, },
    address: { type: [AddressSchema] },
    role: { type: String, },
    cart: { type: CartSchema },
    wishList: {
        items: [{
            productId: { type: Schema.Types.ObjectId, ref: 'Product', },
        }],
    },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    authToken: { type: String, },
    tokenExpiration: { type: Date, },
    resetPasswordToken: { type: String, },
    resetPasswordTokenExpiration: { type: Date, },
    isVerified: { type: Boolean, },
    phone: { type: String, },
    image_urls: { type: [String], },
    imageData: [{
        publicId: { type: String, },
        url: { type: String, },
        secure_url: { type: String, },
        original_filename: { type: String, },
    }],
});




// const UserModel = mongoose.model<UserType>('User', UserSchema);
const UserModel: Model<UserType> = mongoose.models?.User || mongoose.model<UserType>('User', UserSchema);

export { UserModel, UserSchema };