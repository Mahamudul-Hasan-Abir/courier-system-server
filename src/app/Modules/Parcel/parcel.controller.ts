import httpStatus from "http-status";
import { Request, Response } from "express";
import { ParcelServices } from "./parcel.service";
import sendResponse from "../../../utils/sendResponse";
import AppError from "../../Errors/AppError";

const createParcel = async (req: Request, res: Response) => {
  const customerId = (req as any).userId;
  const parcelData = { ...req.body, customer: customerId };
  const result = await ParcelServices.createParcelIntoDB(parcelData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Parcel created successfully",
    data: result,
  });
};

const getMyParcels = async (req: Request, res: Response) => {
  const customerId = (req as any).userId;
  const parcels = await ParcelServices.getCustomerParcels(customerId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Parcel retrieved successfully",
    data: parcels,
  });
};

const getParcelDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new AppError(httpStatus.NOT_FOUND, "Parcel not found");
  }

  const parcel = await ParcelServices.getParcelById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Parcel fetched successfully",
    data: parcel,
  });
};

const getAllParcels = async (req: Request, res: Response) => {
  const parcels = await ParcelServices.getAllParcels();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All parcels retrieved successfully",
    data: parcels,
  });
};
const assignAgent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { agentId } = req.body;

  if (!id || !agentId) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Parcel ID and Agent ID are required"
    );
  }

  const result = await ParcelServices.assignAgentToParcel(id, agentId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Agent assigned successfully",
    data: result,
  });
};

const getAgentParcels = async (req: Request, res: Response) => {
  const agentId = (req as any).userId;
  const parcels = await ParcelServices.getAgentParcels(agentId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Agent parcels retrieved successfully",
    data: parcels,
  });
};

const updateStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, location } = req.body;

  if (!id || !status) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Parcel ID and status are required"
    );
  }

  const updated = await ParcelServices.updateParcelStatus(id, status, location);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Parcel status updated successfully",
    data: updated,
  });
};

export const ParcelController = {
  createParcel,
  getMyParcels,
  getParcelDetails,
  getAllParcels,
  assignAgent,
  getAgentParcels,
  updateStatus,
};
