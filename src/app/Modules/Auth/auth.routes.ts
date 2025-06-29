import { Router } from "express";
import { AuthControllers } from "./auth.controller";

const router = Router();

router.post("/register", AuthControllers.createUser);

router.post("/login", AuthControllers.loginUser);

export const AuthRoutes = router;
