const User = require("../models/User.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const logger = require('../config/logConfig.js');
const { log } = require("console");

const register = async (req, res) => {
    try {
        const { name, surname, organization, phone, email, password, role } = req.body;
        const isExistWithEmail = await User.findOne({ email });
        if (isExistWithEmail) {
            logger.info('Already registered user tried to register again' + isExistWithEmail.id);
            return res.status(400).send({ message: 'User already exists' });

        }
        const userId = crypto.randomBytes(8).toString('hex');
        const isExistWithId = await User.findOne({ id: userId }); // its very unlikely to happen but just in case

        if (isExistWithId) {
            logger.info('Very unlikely case happened and faced with same id' + isExistWithId.id);
            return res.status(400).send({ message: 'Please try again' });
        }
        const user = new User({ id: userId, name, surname, organization, phone, email, password, role: role || 'user' });

        user.save();
        logger.info('New user registered' + user.id);
        res.status(201).send({ message: 'User registered successfully' });

    } catch (error) {
        res.status(500).send('Internal server error:' + error);
        logger.error('Internal server error:' + error);
    }

};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || !await bcrypt.compare(password, user.password)) {
            logger.info("User tried to login with wrong credentials" + user.id || "");
            return res.status(401).send("Username or password incorrect");
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30min' });
        logger.info("User logged in" + user.id || "");
        res.status(200).send({ token });
    } catch (error) {
        logger.error('Internal server error:' + error);
        res.status(500).send('Internal server error' + error);
    }
};

const update = async (req, res) => {
    const userId = req.user.id; // useerId from token
    const { name, surname, organization, phone, email, password } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send('User not found.');
        }

        // Check updated info
        if (name) user.name = name;
        if (surname) user.surname = surname;
        if (organization) user.organization = organization;
        if (phone) user.phone = phone;
        if (email) user.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        await user.save();
        logger.info("User profile updated" + user.id || "");
        res.status(200).send('User profile updated.');
    } catch (error) {
        logger.error('Internal server error:' + error);
        res.status(500).send('Bir hata oluştu: ' + error.message);
    }
}

const remove = async (req, res) => {
    const userId = req.user.id; // Kullanıcının kimlik doğrulaması ve id'sinin alınması

    try {
        const user = await User.findOne({ userId });

        if (!user) {
            return res.status(404).send('User not found.');
        }
        await user.remove();
        logger.info("User deleted" + userId || "");
        res.status(200).send('User deleted.');
    } catch (error) {
        res.status(500).send("Internal Server Error" + error.message);
    }
}

const getUserProfile = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findOne({ id });
        logger.info("User profile called" + user.id || "");
        res.status(200).json(user);
    } catch (error) {
        logger.error('Internal server error:' + error);
        res.status(500).send('Internal server error:' + error);
    }

};

const getUserbyEmail = (req, res) => {
    const { email } = req.params;
    const user = User.findOne({ email });
    if (!user) {
        logger.info('User not found' + email || "");
        return res.status(404).send({ message: 'User not found' });
    }
    logger.info('User called with username' + username + user.id || "");
    res.status(200).json(user);
}

const isAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send('Authorization header missing');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send('Token missing');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        logger.info("User authenticated " + req.user.id || "");
        next();
    } catch (error) {
        return res.status(401).send('Token invalid');
    }
}


const isLogged = (req, res) => {
    logger.info("User authentication checked" + req.user.id || "");
    return res.status(200).send({ message: "Logged in" });
}

const logOut = (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    try {
        logger.info("User logged out" + user.id || "");
        return res.status(200).send({ message: "Logged out" });
    }
    catch (error) {
        return res.status(401).send('Logged out or invalid token');
    }
}


const healthCheck = (req, res) => {
    res.sendStatus(200);
}


module.exports = {
    healthCheck,
    getUserProfile,
    isAuth,
    getUserbyEmail,
    login,
    register,
    update,
    remove,
    isLogged,
    logOut,
};