import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import { unique } from "next/dist/build/utils";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide username'],
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: true,
        lowercase: true,
        match: [/^\\S+@\\S+\\.\\S+$/, 'Please provide valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
        select: false
    },
    role: {
        type: String,
        enum: ['user', 'author', 'admin'],
        default: 'author'
    },
    avatar: {
        type: String,
        default: 'https://via.placeholder.com/150'
    },
    bio: {
        type: String,
        maxlength: 500
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

}, {
    timestamps: true
});

//Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
});

// Compare password method

UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

export default mongoose.models.User || mongoose.model('User', UserSchema)