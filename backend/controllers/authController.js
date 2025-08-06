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

exports.getCurrentUser = async (req,res) => {
    try{
        const user = await User.findById(req.user._id).select('-password');
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        res.json({user});
    }catch(error){
        res.status(500).json({message: 'Something went wrong'});
    }
}

exports.updateUser = async (req, res) => {
    try{
        const user = await User.findById(req.user._id);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }

        const { name, phone, location, bio  } = req.body;

        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (location) user.location = location;
        if (bio) user.bio = bio;

        await user.save();

        res.json({
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone || "",
                location: user.location || "",
                bio: user.bio || "",
            },
        })
    }catch(err){
        res.status(500).json({message: 'Something went wrong'});
    }
}