const User = require("../models/User.js");
const jwt = require('jsonwebtoken')

const registerUser = (req, res) => {
    const { username, email, password } = req.body;
    if (users[username]) {
        return res.status(400).send({ message: 'User already exists' });
    }
    users[username] = { password, profile: {} }; 
    res.status(201).send({ message: 'User registered successfully' });
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
    res.status(200).send({ message: 'User logged in successfully' });
};

const getUserProfile = (req, res) => {
    const { username } = req.params;
    const user = users[username];
    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).json(user.profile);
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile
};
