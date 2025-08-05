const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
    try{
        const token = req.cookies[process.env.COOKIE_NAME];
        if(!token){
            return res.status(401).json({message: 'Not authorized'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');

        if(!req.user){
            return res.status(401).json({message: 'User not found'});
        }
        next();
    }catch(error) {
        res.status(401).json({message: 'Not authorized, token failed'});
    }
};

module.exports = { protect };