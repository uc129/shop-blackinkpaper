import mongoose, { Schema } from "mongoose";


export type AddressType = {
    _id?: Schema.Types.ObjectId;
    name: string,
    phone: string,
    building: string,
    street: string,
    city: string,
    state: string,
    country: string,
    postalCode: string,
    instructions: string,
    default: boolean
}

export const AddressSchema = new Schema<AddressType>({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    building: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true },
    instructions: { type: String, default: '' },
    default: { type: Boolean, default: false }
})


// const AddressModel = mongoose.model('Address', AddressSchema);

const AddressModel = mongoose.models?.Address || mongoose.model('Address', AddressSchema);

export default AddressModel;
