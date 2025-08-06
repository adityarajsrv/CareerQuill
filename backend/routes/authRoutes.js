const express = require('express');
const router = express.Router();
const{
    register,
    login,
    logout,
    getCurrentUser,
    updateUser
} = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login); 
router.post('/logout', logout);
router.get('/current', protect, getCurrentUser);
router.put('/update', protect, updateUser);

module.exports = router;
