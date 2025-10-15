import mongoose from "mongoose";
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide post title'],
        trim: true,
        maxlength: 200
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true
    },
    excerpt: {
        type: String,
        maxlength: 300
    },
    content: {
        type: String,
        required: [true, 'Please provide post content']
    },
    category: {
        type: String,
        required: true,
        enum: ['technology', 'lifestyle', 'travel', 'food', 'other'],
        default: 'other'
    },
    tags: [{
        type: String,
        trim: true,
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    featuredImage: {
        type: String,
        default: 'https://via.placeholder.com/800x400'
    },
    status:{
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'published'
    }

})