import express from "express";
import db from "../prisma-client.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
	const movies = await db.movie.findMany();
	res.json(movies);
});

export default router;
