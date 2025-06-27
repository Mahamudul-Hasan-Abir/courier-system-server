import { getOptimizedRouteFromGoogle } from "../../../utils/googleMapsClient";
import Parcel from "../Parcel/parcel.model";

const getOptimizedRoute = async (agentId: string) => {
  // First, let's check if the agent has any parcels at all
  const allAgentParcels = await Parcel.find({
    assignedAgent: agentId,
  });

  console.log(`Agent ${agentId} has ${allAgentParcels.length} total parcels`);
  console.log(
    "Parcel statuses:",
    allAgentParcels.map((p) => p.status)
  );

  // Get parcels that are active (not delivered or failed)
  const activeParcels = await Parcel.find({
    assignedAgent: agentId,
    status: { $in: ["Booked", "Picked Up", "In Transit"] },
  });

  console.log(`Agent ${agentId} has ${activeParcels.length} active parcels`);

  if (activeParcels.length < 2) {
    return {
      optimized: false,
      message: `Not enough parcels to optimize. Agent has ${activeParcels.length} active parcels.`,
      addresses: activeParcels.map((p) => p.deliveryAddress),
      totalParcels: allAgentParcels.length,
      activeParcels: activeParcels.length,
    };
  }

  const addresses = activeParcels.map((p) => p.deliveryAddress);
  const origin = addresses[0]!;
  const destination = addresses[addresses.length - 1]!;
  const waypoints = addresses.slice(1, -1);

  try {
    const result = await getOptimizedRouteFromGoogle(
      origin,
      destination,
      waypoints
    );

    return {
      optimized: true,
      googleResponse: result,
      totalParcels: allAgentParcels.length,
      activeParcels: activeParcels.length,
    };
  } catch (error) {
    console.error("Error getting optimized route:", error);
    return {
      optimized: false,
      message: "Error getting optimized route from Google Maps",
      error: error instanceof Error ? error.message : "Unknown error",
      addresses: addresses,
    };
  }
};

const getAgentParcels = async (agentId: string) => {
  const allParcels = await Parcel.find({ assignedAgent: agentId });
  const activeParcels = await Parcel.find({
    assignedAgent: agentId,
    status: { $in: ["Booked", "Picked Up", "In Transit"] },
  });

  return {
    totalParcels: allParcels.length,
    activeParcels: activeParcels.length,
    allParcels: allParcels.map((p) => ({
      id: p._id,
      status: p.status,
      deliveryAddress: p.deliveryAddress,
      pickupAddress: p.pickupAddress,
    })),
    activeParcelsList: activeParcels.map((p) => ({
      id: p._id,
      status: p.status,
      deliveryAddress: p.deliveryAddress,
      pickupAddress: p.pickupAddress,
    })),
  };
};

export const RouteOptimizationServices = {
  getOptimizedRoute,
  getAgentParcels,
};
