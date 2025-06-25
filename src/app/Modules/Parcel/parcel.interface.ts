import { Types } from "mongoose";

export type ParcelStatus =
  | "Booked"
  | "Picked Up"
  | "In Transit"
  | "Delivered"
  | "Failed";

export type ParcelType =
  | "Document"
  | "Electronics"
  | "Clothing"
  | "Fragile"
  | "Other";
export type ParcelSize = "Small" | "Medium" | "Large" | "Oversized";

export interface IParcel {
  _id?: string;
  customer: Types.ObjectId;
  pickupAddress: string;
  deliveryAddress: string;
  parcelType: ParcelType;
  parcelSize: ParcelSize;
  codAmount: number;
  isPrepaid: boolean;
  status: ParcelStatus;
  assignedAgent?: Types.ObjectId;
  currentLocation?: {
    lat: number;
    lng: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
