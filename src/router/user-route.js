import express from "express";
// import db from "../prisma-client.js";
import {
	getAllUser,
	getUserById,
	register,
} from "../controller/user-controller.js";

// ติดตั้ง router
const router = express.Router();

// router ทำงานได้เหมือน app

// --------------- GET /users --------------- //
router.get("/", getAllUser);

// --------------- GET /users/:id --------------- //
router.get("/:userId", getUserById);

// --------------- POST /users --------------- //
router.post("/", register);

export default router;
