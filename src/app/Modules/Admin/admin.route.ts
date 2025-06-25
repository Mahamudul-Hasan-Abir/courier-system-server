import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../Auth/auth.constant";
import { AdminController } from "./admin.service";

const router = Router();

router.get(
  "/dashboard",
  auth(USER_ROLE.admin),
  AdminController.getDashboardStats
);

export const AdminRoutes = router;
