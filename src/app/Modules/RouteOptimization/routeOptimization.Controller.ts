import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { RouteOptimizationServices } from "./routeOptimization.service";
import sendResponse from "../../../utils/sendResponse";

// const getOptimizedRoute = catchAsync(async (req: Request, res: Response) => {
//   const agentId = req.params.agentId;
//   if (!agentId) {
//     return sendResponse(res, {
//       success: false,
//       statusCode: httpStatus.BAD_REQUEST,
//       message: "Agent ID is required",
//       data: null,
//     });
//   }
//   const result = await RouteOptimizationServices.getOptimizedRoute(agentId);

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: "Optimized route generated",
//     data: result,
//   });
// });
const getOptimizedRoute = catchAsync(async (req: Request, res: Response) => {
  const agentId = (req as any).userId; // from decoded JWT via auth middleware

  const result = await RouteOptimizationServices.getOptimizedRoute(agentId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Optimized route generated",
    data: result,
  });
});
export const RouteOptimizationController = {
  getOptimizedRoute,
};
