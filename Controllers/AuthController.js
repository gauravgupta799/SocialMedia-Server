const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

// Register
const register = async (req, res) => {
	const { username, password, firstname, lastname } = req.body;
	try {
		let user = await User.findOne({ username });
		user && res.status(409).json({ message: "Username already exists" });
		const salt = await bcrypt.genSalt(10);
		const hashedPass = await bcrypt.hash(password, salt);
		let newUser = await User({ ...req.body, password: hashedPass }).save();
		res.status(200).json(newUser);
	} catch (err) {
		res.status(500).json({ message: err.message });
		console.log(err);
	}
};

// Login
const login = async (req, res) => {
	const { username, password } = req.body;
	try {
		let user = await User.findOne({ username });
		!user && res.status(409).json({ message: "User does not exist" });
		const ValidatePass = await bcrypt.compare(password, user.password);
        if(!ValidatePass){
            res.status(403).json({ message: "Invalid password or username!" })
        }else{
            const accessToken = jwt.sign({id:user._id,username:user.username},"gaurav99",{expiresIn:'1h'})
            // const {password, ...info} = user._doc;
            res.status(200).json({ message: "You logged in successfully",accessToken:accessToken })
        }
    }catch (err) {
		res.status(500).json({ message: err.message });
		console.log(err);
	}
};

module.exports = { register, login };
