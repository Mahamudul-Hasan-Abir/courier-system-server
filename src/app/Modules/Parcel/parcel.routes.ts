import { Router } from "express";
import { USER_ROLE } from "../Auth/auth.constant";
import { ParcelController } from "./parcel.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.post("/", auth(USER_ROLE.customer), ParcelController.createParcel);
router.get("/my", auth(USER_ROLE.customer), ParcelController.getMyParcels);
router.get("/:id", ParcelController.getParcelDetails); // any logged-in user

router.get("/", auth(USER_ROLE.admin), ParcelController.getAllParcels);

router.put("/assign/:id", auth(USER_ROLE.admin), ParcelController.assignAgent);

router.get(
  "/agent/my-parcels",
  auth(USER_ROLE.agent),
  ParcelController.getAgentParcels
);

router.put("/status/:id", auth(USER_ROLE.agent), ParcelController.updateStatus);
export const ParcelRoutes = router;
