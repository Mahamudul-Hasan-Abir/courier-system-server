import { Request, Response } from "express";
import httpStatus from "http-status";

import sendResponse from "../../../utils/sendResponse";
import { AdminServices } from "./admin.controller";

const getDashboardStats = async (_req: Request, res: Response) => {
  const data = await AdminServices.getDashboardStats();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Dashboard stats fetched successfully",
    data,
  });
};

export const AdminController = {
  getDashboardStats,
};
