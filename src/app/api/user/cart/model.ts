import mongoose, { Schema } from "mongoose";

export type CartItemType = {
    _id?: Schema.Types.ObjectId;
    productId: Schema.Types.ObjectId;
    quantity: number;
    price: number;
    total: number;
    size: {
        size: string;
        priceJump: number;
    };
    frame: {
        frame: string;
        priceJump: number;
    }
    material: {
        material: string;
        priceJump: number;
    }
}

export type CartType = {
    items: CartItemType[];
    grandTotal: number;
    totalItems: number;
}

const SizeSchema = new Schema({
    size: { type: String, default: '' },
    priceJump: { type: Number, default: 0 },
})

const FrameSchema = new Schema({
    frame: { type: String, default: '' },
    priceJump: { type: Number, default: 0 },
})

const MaterialSchema = new Schema({
    material: { type: String, default: '' },
    priceJump: { type: Number, default: 0 },
})


export const CartSchema = new Schema<CartType>({
    items: [{
        productId: { type: Schema.Types.ObjectId, ref: 'Product', },
        quantity: { type: Number, default: 0 },
        price: { type: Number, default: 0 },
        total: { type: Number, default: 0 },
        size: { type: SizeSchema },
        frame: { type: FrameSchema },
        material: { type: MaterialSchema }
    }],
    grandTotal: { type: Number, default: 0 },
    totalItems: { type: Number, default: 0 },
})



// const CartModel = mongoose.model('Cart', CartSchema);
const CartModel = mongoose.models?.Cart || mongoose.model('Cart', CartSchema);

export default CartModel;