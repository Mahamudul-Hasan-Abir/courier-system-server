import { IParcel } from "./parcel.interface";
import Parcel from "./parcel.model";

const createParcelIntoDB = async (payload: IParcel) => {
  const parcel = await Parcel.create(payload);
  return parcel;
};

const getCustomerParcels = async (customerId: string) => {
  return Parcel.find({ customer: customerId }).sort({ createdAt: -1 });
};

const getParcelById = async (parcelId: string) => {
  return Parcel.findById(parcelId).populate("assignedAgent customer");
};

const getAllParcels = async () => {
  const parcels = Parcel.find().populate("customer assignedAgent");
  return parcels;
};

const assignAgentToParcel = async (parcelId: string, agentId: string) => {
  const parcel = await Parcel.findByIdAndUpdate(
    parcelId,
    { assignedAgent: agentId },
    { new: true }
  );
  return parcel;
};

const getAgentParcels = async (agentId: string) => {
  return Parcel.find({ assignedAgent: agentId });
};

const updateParcelStatus = async (
  parcelId: string,
  status: string,
  location?: { lat: number; lng: number }
) => {
  const updateData: any = { status };
  if (location) updateData.currentLocation = location;

  return Parcel.findByIdAndUpdate(parcelId, updateData, { new: true });
};

export const ParcelServices = {
  createParcelIntoDB,
  getCustomerParcels,
  getParcelById,
  assignAgentToParcel,
  getAllParcels,
  getAgentParcels,
  updateParcelStatus,
};
