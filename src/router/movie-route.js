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

router.post("/", async (req, res, next) => {
	const { title, description, image, releaseDate, genre, rating, duration } =
		req.body;

	if (
		!title ||
		!description ||
		!image ||
		!releaseDate ||
		!genre ||
		!rating ||
		!duration
	) {
		return res.status(400).json({ message: "All field required" });
	}

	const newMovie = await db.movie.create({
		data: {
			title,
			description,
			image,
			releaseDate,
			genre,
			rating: +rating,
			duration: +duration,
		},
	});
	return res.json(newMovie);
});

export default router;
