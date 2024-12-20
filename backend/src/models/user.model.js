const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Name: { type: String, require: [true, 'Please Enter the Name...']},
    email: {
        type: String,
        require: [true, 'Please enter Email...'],
        unique: [true, 'Please enter unique Email address'],
    },
    password: {type: String, require:[true, 'Please enter the password...'] },
    address: [
        { city: String },
        { country: String },
        { add1: String },
        { add2: String },
        { zipCode: String },
        { addressType: String },
    ],
    role: { type: String, default: "user" },
    avatar: {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,
},
    { versionKey: false }
);

const model = mongoose.model('User', userSchema);

module.exports = model;