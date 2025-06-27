// src/modules/admin/admin.controller.ts
import { Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../utils/sendResponse";
import { AdminServices } from "./admin.service";
import { User } from "../User/user.model";

const getDashboardStats = async (_req: Request, res: Response) => {
  const data = await AdminServices.getDashboardStats();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Dashboard stats fetched successfully",
    data,
  });
};

const exportCSV = async (_req: Request, res: Response) => {
  const csvData = await AdminServices.generateCSV();

  res.header("Content-Type", "text/csv");
  res.attachment("parcel-report.csv");
  res.send(csvData);
};

const getAllAgents = async (_req: Request, res: Response) => {
  const data = await AdminServices.getAllAgents();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All Agents Retrieved Successfully",
    data,
  });
};

const exportPDF = async (_req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=parcel-report.pdf"
  );
  await AdminServices.generatePDF(res);
};

export const AdminController = {
  getDashboardStats,
  exportCSV,
  exportPDF,
  getAllAgents,
};
