import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../Auth/auth.constant";
import { AdminController } from "./admin.controller";

const router = Router();

router.get(
  "/dashboard",
  auth(USER_ROLE.admin),
  AdminController.getDashboardStats
);

router.get("/export/csv", auth(USER_ROLE.admin), AdminController.exportCSV);
router.get("/export/pdf", auth(USER_ROLE.admin), AdminController.exportPDF);

export const AdminRoutes = router;
