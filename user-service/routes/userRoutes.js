const express = require('express');
const authController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile/:username', getUserProfile);
router.get('/protected', authenticateToken, (req, res) => {
    res.send('Protected content');
});
module.exports = router;
ss