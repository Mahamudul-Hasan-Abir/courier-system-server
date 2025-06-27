import { Router } from "express";
import { RouteOptimizationController } from "./routeOptimization.Controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../Auth/auth.constant";

const router = Router();

router.get(
  "/my-optimized-route",
  auth(USER_ROLE.agent),
  RouteOptimizationController.getOptimizedRoute
);

router.get(
  "/my-parcels",
  auth(USER_ROLE.agent),
  RouteOptimizationController.getAgentParcels
);

export const RouteOptimizationRoutes = router;
