import { Request, Response } from "express";

import Parcel from "../Parcel/parcel.model";
import { Parser } from "json2csv";
import moment from "moment";
import PDFDocument from "pdfkit";
import { User } from "../User/user.model";
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

const getAllAgents = async () => {
  const agents = await User.find({ role: "agent" });
  return agents;
};

const generateCSV = async () => {
  const parcels = await Parcel.find().populate("customer assignedAgent");

  const fields = [
    "pickupAddress",
    "deliveryAddress",
    "parcelType",
    "parcelSize",
    "status",
    "isPrepaid",
    "codAmount",
    "customer.email",
    "assignedAgent.email",
    "createdAt",
  ];

  const opts = { fields };
  const parser = new Parser(opts);
  const csv = parser.parse(parcels.map((p) => p.toObject()));

  return csv;
};

const generatePDF = async (res: Response) => {
  const parcels = await Parcel.find().populate("customer assignedAgent");

  const doc = new PDFDocument();
  doc.pipe(res);

  doc.fontSize(20).text("Parcel Report", { align: "center" });
  doc.moveDown();

  parcels.forEach((p: any, i: number) => {
    doc
      .fontSize(10)
      .text(
        `${i + 1}. Parcel from ${p.pickupAddress} to ${
          p.deliveryAddress
        } | Type: ${p.parcelType}, Status: ${p.status}`
      );
    doc.text(
      `Customer: ${
        (p.customer && (p.customer as any).email) || "N/A"
      } | Agent: ${
        p.assignedAgent && (p.assignedAgent as any).email
          ? (p.assignedAgent as any).email
          : "N/A"
      }`
    );
    doc.text(`COD: ${p.codAmount} | Prepaid: ${p.isPrepaid ? "Yes" : "No"}`);
    doc.text(`Date: ${moment(p.createdAt).format("DD-MM-YYYY")}`);
    doc.moveDown();
  });

  doc.end();
};
export const AdminServices = {
  getDashboardStats,
  generateCSV,
  generatePDF,
  getAllAgents,
};
