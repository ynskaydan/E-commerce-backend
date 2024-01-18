const express = require('express');
const { register, login, update, remove, isAuth, getUserbyEmail, getUserProfile, isLogged, healthCheck, logOut } = require('../controllers/authController');
const router = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: User registration
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               organization:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful registration
 */
router.post('/register', register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 */
router.post('/login', login);

/**
 * @swagger
 * /isAuth:
 *   get:
 *     summary: Check the user's authentication status
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Authentication successful
 */
router.get('/isAuth', isAuth);

/**
 * @swagger
 * /update:
 *   put:
 *     summary: Update user information
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               organization:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User information successfully updated
 */
router.put('/update', isAuth, update);

/**
 * @swagger
 * /delete:
 *   delete:
 *     summary: Delete user information
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User information successfully deleted
 */
router.delete('/delete', isAuth, remove);

/**
 * @swagger
 * /profile/{email}:
 *   get:
 *     summary: Get user information
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email address of the user
 *     responses:
 *       200:
 *         description: User information successfully retrieved
 */
router.get('/profile/:email', getUserbyEmail);

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get a user's profile
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User profile successfully returned
 */
router.get('/profile', isAuth, getUserProfile);
/**
 * @swagger
 * /isLogged:
 *   post:
 *     summary: Check if the user is logged in
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User is logged in
 */
router.post('/isLogged', isAuth, isLogged);
/**
 * @swagger
 * /logout:
 *   post:
 *     summary: User logout
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully logged out
 */
router.post('/logout', isAuth, logOut);

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Check the health of the service
 *     responses:
 *       200:
 *         description: Service is healthy
 */
router.get('/health', healthCheck);

module.exports = router;


