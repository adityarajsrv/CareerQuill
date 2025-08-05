const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({email});
    if(userExists) {
        return res.status(400).json({message: 'User already exists'});
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    res.cookie(process.env.COOKIE_NAME, token, {
        httpOnly : true,
        secure: true,
        sameSite: 'Strict',
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(201).json({
        user: {
            name: user.name,
            email: user.email,
        },
    });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if(!user || !(await user.matchPassword(password))){
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const token = generateToken(user._id);

    res.cookie(process.env.COOKIE_NAME, token, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    })

    res.json({
        user: {
            name: user.name,
            email: user.email,
        },
    });
};

exports.logout = (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME)
    res.status(200).json({message: 'Logged out successfully'});
};
