import Parcel from "../Parcel/parcel.model";
import moment from "moment";

const getDashboardStats = async () => {
  const today = moment().startOf("day").toDate();
  const weekAgo = moment().subtract(7, "days").startOf("day").toDate();
  const monthAgo = moment().subtract(30, "days").startOf("day").toDate();

  const totalToday = await Parcel.countDocuments({
    createdAt: { $gte: today },
  });
  const totalWeek = await Parcel.countDocuments({
    createdAt: { $gte: weekAgo },
  });
  const totalMonth = await Parcel.countDocuments({
    createdAt: { $gte: monthAgo },
  });

  const codAmount = await Parcel.aggregate([
    { $match: { isPrepaid: false } },
    { $group: { _id: null, totalCOD: { $sum: "$codAmount" } } },
  ]);

  const failedDeliveries = await Parcel.countDocuments({ status: "Failed" });

  return {
    bookings: {
      today: totalToday,
      week: totalWeek,
      month: totalMonth,
    },
    codAmount: codAmount[0]?.totalCOD || 0,
    failedDeliveries,
  };
};

export const AdminServices = {
  getDashboardStats,
};
