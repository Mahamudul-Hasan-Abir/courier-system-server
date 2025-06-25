import { getOptimizedRouteFromGoogle } from "../../../utils/googleMapsClient";
import Parcel from "../Parcel/parcel.model";

const getOptimizedRoute = async (agentId: string) => {
  const parcels = await Parcel.find({
    assignedAgent: agentId,
    status: { $in: ["Picked Up", "In Transit"] },
  });

  if (parcels.length < 2) {
    return {
      optimized: false,
      message: "Not enough parcels to optimize.",
      addresses: parcels.map((p) => p.deliveryAddress),
    };
  }

  const addresses = parcels.map((p) => p.deliveryAddress);
  const origin = addresses[0]!;
  const destination = addresses[addresses.length - 1]!;
  const waypoints = addresses.slice(1, -1);

  const result = await getOptimizedRouteFromGoogle(
    origin,
    destination,
    waypoints
  );

  return {
    optimized: true,
    googleResponse: result,
  };
};

export const RouteOptimizationServices = {
  getOptimizedRoute,
};
