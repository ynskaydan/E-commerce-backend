const User = require("../models/User.js");

const registerUser = (req, res) => {
    const { username, password } = req.body;
    if (users[username]) {
        return res.status(400).send({ message: 'User already exists' });
    }
    users[username] = { password, profile: {} }; // Password should be hashed in a real app
    res.status(201).send({ message: 'User registered successfully' });
};

const loginUser = (req, res) => {
    const { username, password } = req.body;
    const user = users[username];
    if (!user || user.password !== password) { // Password comparison should be secure in a real app
        return res.status(401).send({ message: 'Invalid credentials' });
    }
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
