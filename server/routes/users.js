const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error) return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user) return res.status(409).send({ message: "An account with this email address already exists." });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/me", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user._id).select("-password");
		res.send(user);
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.put("/me", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user._id);
		if (!user) return res.status(404).send({ message: "User not found" });

		const { firstName, lastName, height, weight, age, gender, weightGoal, password, newPassword } = req.body;

		user.firstName = firstName || user.firstName;
		user.lastName = lastName || user.lastName;
		user.height = height || user.height;
		user.weight = weight || user.weight;
		user.age = age || user.age;
		user.gender = gender || user.gender;
		user.weightGoal = weightGoal || user.weightGoal;

		if (password && newPassword) {
			const validPassword = await bcrypt.compare(password, user.password);
			if (!validPassword) return res.status(400).send({ message: "Invalid current password" });

			const salt = await bcrypt.genSalt(Number(process.env.SALT));
			user.password = await bcrypt.hash(newPassword, salt);
		}

		await user.save();
		res.send({ message: "User updated successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;