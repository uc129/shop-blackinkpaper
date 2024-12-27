import { CartItem } from "../users/model";



export type Order = {
    orderId: string;
    orderDate: Date;
    orderItems: CartItem[];
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