import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import { send } from "process";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const userPayload = {
    ...req.body,
  };

  const result = await AuthServices.createUserIntoDB(userPayload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User registerd and logged in successfully",
    token: result.accessToken,
    data: result.restData,
  });
});

const loginUser = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await AuthServices.loginUser(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User logged in successfully",
      token: result.accessToken,
      data: result.restData,
    });
  }
);

export const AuthControllers = {
  createUser,
  loginUser,
};
