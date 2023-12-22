import express from "express";
const router = express.Router();
 import { login, signup } from '../controllers/authController';



//router.get("/", getAllUsers);
router.post("/login",login)
router.post('/signup',signup)

export default router;

