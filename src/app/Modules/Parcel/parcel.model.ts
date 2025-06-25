import mongoose from "mongoose";
import { IParcel } from "./parcel.interface";

const parcelSchema = new mongoose.Schema<IParcel>(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pickupAddress: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    parcelType: {
      type: String,
      enum: ["Document", "Electronics", "Clothing", "Fragile", "Other"],
      required: true,
    },
    parcelSize: {
      type: String,
      enum: ["Small", "Medium", "Large", "Oversized"],
      required: true,
    },
    codAmount: { type: Number, default: 0 },
    isPrepaid: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["Booked", "Picked Up", "In Transit", "Delivered", "Failed"],
      default: "Booked",
    },
    assignedAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    currentLocation: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  {
    timestamps: true,
  }
);

const Parcel = mongoose.model<IParcel>("Parcel", parcelSchema);
export default Parcel;
