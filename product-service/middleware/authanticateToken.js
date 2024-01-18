const axios = require('axios');

const authenticateToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.sendStatus(401);

        // auth-service'e token doğrulama isteği gönder
        const response = await axios.get('http://localhost:3001/users/verifyToken', {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200) {
            req.user = response.data.user;
            next();
        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
