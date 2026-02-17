import express from 'express';
import { registerUser, loginUser } from "../controllers/authController.js";
import { registerValidation, loginValidation } from "../validators/authValidators.js";
import validateRequest from "../middleware/validateRequest.js";
const router = express.Router();


router.post("/register",registerValidation,validateRequest, registerUser);
router.post("/login",loginValidation,validateRequest, loginUser);
//Flow after apply validation Route → Validation Rules → validateRequest(middleware) → Controller
export default router;