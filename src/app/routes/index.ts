import { Router } from "express";
import { AuthRoutes } from "../Modules/Auth/auth.routes";
import { ParcelRoutes } from "../Modules/Parcel/parcel.routes";

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
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
