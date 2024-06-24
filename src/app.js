import "dotenv/config";
import express from "express";
// import db from "./prisma-client.js";
import usersRoute from "./router/user-route.js";

const PORT = process.env.PORT;
const app = express();

// ถ้า content type เป็น application/json
// จะเอา json ใส่ req.body ให้
app.use(express.json());

app.get("/", (req, res) => {
	return res.json({ message: "Hi" });
});

app.use("/users", usersRoute);

app.listen(PORT, () => {
	console.log("Server Running at port", PORT);
});
