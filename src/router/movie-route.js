import express from "express";
import db from "../prisma-client.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
	const movies = await db.movie.findMany();
	return res.json(movies);
});

router.get("/:movieId", async (req, res, next) => {
	const movieId = req.params.movieId;
	const movie = await db.movie.findUnique({ where: { id: +movieId } });
	if (!movie) {
		return res
			.status(404)
			.json({ message: `Movie with id ${movieId} is not found` });
	}
	res.json(movie);
});

router.post("/movies", async (req, res, next) => {
	console.log(first);
});
export default router;
