const model = require('mongoose');
const bcrypt = require('bcryptjs');
const { default: mongoose } = require('mongoose');

const userSchema = new model.Schema({
    name: {
        type: String,
        required: false,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: [true, 'Password is required'],
        minlength: 8,
    },
},{
    timestamps: true,
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);