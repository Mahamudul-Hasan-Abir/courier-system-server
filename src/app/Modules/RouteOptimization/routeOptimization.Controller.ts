import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { RouteOptimizationServices } from "./routeOptimization.service";
import sendResponse from "../../../utils/sendResponse";

const getOptimizedRoute = catchAsync(async (req: Request, res: Response) => {
  const agentId = (req as any).userId; // from decoded JWT via auth middleware

  console.log("Request from agent ID:", agentId);
  console.log("User object:", (req as any).user);

  if (!agentId) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.BAD_REQUEST,
      message: "Agent ID not found in request",
      data: null,
    });
  }

  const result = await RouteOptimizationServices.getOptimizedRoute(agentId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Optimized route generated",
    data: result,
  });
});

const getAgentParcels = catchAsync(async (req: Request, res: Response) => {
  const agentId = (req as any).userId;

  console.log("Debug - Request from agent ID:", agentId);

  if (!agentId) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.BAD_REQUEST,
      message: "Agent ID not found in request",
      data: null,
    });
  }

  const result = await RouteOptimizationServices.getAgentParcels(agentId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Agent parcels retrieved",
    data: result,
  });
});

export const RouteOptimizationController = {
  getOptimizedRoute,
  getAgentParcels,
};
