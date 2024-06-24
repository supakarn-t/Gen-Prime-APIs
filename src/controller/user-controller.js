import db from "../prisma-client.js";

// --------------- GET /users --------------- //
const getAllUser = async (req, res, next) => {
	// find user in db
	const users = await db.user.findMany();
	return res.json(users);
};

// --------------- GET /users/:id --------------- //
const getUserById = async (req, res, next) => {
	// Step1 : แกะ path parameter from request obj
	const params = req.params; // {userID : "1"}
	const userId = params.userId;

	// Step2 : หาของใน db
	// findUnique = find
	// +userId = ch str -> int
	const user = await db.user.findUnique({ where: { id: +userId } });

	// Step3 : เจอ user ใน db มั้ย ถ้าไม่ -> 404
	if (!user) {
		return res
			.status(404)
			.json({ message: `User with id ${userId} is not found` });
	}
	res.json(user);
};

// --------------- POST /users --------------- //
const register = async (req, res, next) => {
	const { email, name, password, confirmPassword, isAdmin = false } = req.body;

	// Step1 : Validate
	// Step1-1 : Validate exist
	if (!email || !name || !password || !confirmPassword) {
		return res.status(400).json({ message: "All field required" });
	}

	// Step1-2 : Validate password
	if (password !== confirmPassword) {
		return res.status(400).json({ message: "Password mismatch" });
	}

	// Step1-3 : Validate is email
	if (!email.includes("@")) {
		return res.status(400).json({ message: "Invalid email address" });
	}

	// Step1-4 : Validate unique email
	const exisUser = await db.user.findFirst({ where: { email: email } });
	if (exisUser) {
		return res.status(400).json({ message: "Email already in use" });
	}

	// Step2 : Create new user
	const newUser = await db.user.create({
		data: {
			email,
			name,
			password,
			isAdmin,
		},
	});
	res.status(201).json(newUser);
};

export { getAllUser, getUserById, register };
