import { Router } from "express";
import { AuthRoutes } from "../Modules/Auth/auth.routes";
import { ParcelRoutes } from "../Modules/Parcel/parcel.routes";
import { AdminRoutes } from "../Modules/Admin/admin.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/parcel",
    route: ParcelRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
