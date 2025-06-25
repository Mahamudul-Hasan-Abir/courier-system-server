import { IParcel } from "./parcel.interface";
import Parcel from "./parcel.model";
import { getIO } from "../../socket/socket";
import { sendEmail } from "../../../utils/emailSender";
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

// const updateParcelStatus = async (
//   parcelId: string,
//   status: string,
//   location?: { lat: number; lng: number }
// ) => {
//   const updateData: any = { status };
//   if (location) updateData.currentLocation = location;

//   // return Parcel.findByIdAndUpdate(parcelId, updateData, { new: true });

//   // Emit socket event to parcel room
//   const updatedParcel = await Parcel.findByIdAndUpdate(parcelId, updateData, {
//     new: true,
//   });

//   if (updatedParcel) {
//     const io = getIO();
//     io.to(parcelId).emit("parcelUpdate", {
//       status: updatedParcel.status,
//       location: updatedParcel.currentLocation,
//       parcelId: updatedParcel._id,
//     });
//   }

//   return updatedParcel;
// };

const updateParcelStatus = async (
  parcelId: string,
  status: string,
  location?: { lat: number; lng: number }
) => {
  const updateData: any = { status };
  if (location) updateData.currentLocation = location;

  // Update parcel
  const updatedParcel = await Parcel.findByIdAndUpdate(parcelId, updateData, {
    new: true,
  }).populate("customer");

  // Emit socket event
  if (updatedParcel) {
    const io = getIO();
    io.to(parcelId).emit("parcelUpdate", {
      status: updatedParcel.status,
      location: updatedParcel.currentLocation,
      parcelId: updatedParcel._id,
    });

    // 🔔 Send Email Notification to Customer
    if ((updatedParcel.customer as any)?.email) {
      await sendEmail(
        (updatedParcel.customer as any).email,
        `Your Parcel Status: ${updatedParcel.status}`,
        `<p>Dear ${(updatedParcel.customer as any).name || "Customer"},</p>
         <p>Your parcel (ID: ${updatedParcel._id}) is now <strong>${
          updatedParcel.status
        }</strong>.</p>
         <p>Thank you for using our service!</p>`
      );
    }
  }

  return updatedParcel;
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
