import mongoose, { Schema } from "mongoose";
import { CartItemType } from "../user/cart/model";



export type Order = {
    _id: string;
    user: Schema.Types.ObjectId;
    orderDate: Date;
    orderItems: CartItemType[];
    total: number;
    totalItems: number;
    shippingAddress: {
        address: string;
        city: string;
        postalCode: string;
        country: string;
    }
    paymentMethod: string;
    paymentResult: {
        id: string;
        status: string;
        update_time: string;
        email_address: string;
    }
    isPaid: boolean;
    paidAt: Date;
    isDelivered: boolean;
    deliveredAt: Date;
}

const OrderSchema = new Schema<Order>({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    orderDate: { type: Date, default: Date.now },
    orderItems: [{
        productId: { type: Schema.Types.ObjectId, ref: 'Product', },
        quantity: { type: Number, },
        price: { type: Number, },
    }],
    total: { type: Number, },
    totalItems: { type: Number, },
    shippingAddress: {
        address: { type: String, },
        city: { type: String, },
        postalCode: { type: String, },
        country: { type: String, },
    },
    paymentMethod: { type: String, },
    paymentResult: {
        id: { type: String, },
        status: { type: String, },
        update_time: { type: String, },
        email_address: { type: String, },
    },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date, },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date, },


})

// const OrderModel = mongoose.model<Order>('Order', OrderSchema);
const OrderModel = mongoose.models?.Order || mongoose.model('Order', OrderSchema);

export default OrderModel;


