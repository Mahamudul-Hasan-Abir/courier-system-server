import axios from "axios";

export const getOptimizedRouteFromGoogle = async (
  origin: string,
  destination: string,
  waypoints: string[]
) => {
  const key = process.env.GOOGLE_API_KEY;

  const response = await axios.get(
    "https://maps.googleapis.com/maps/api/directions/json",
    {
      params: {
        origin,
        destination,
        waypoints: `optimize:true|${waypoints.join("|")}`,
        key,
      },
    }
  );

  return response.data;
};
