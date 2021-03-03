const { Timestamp } = require('bson');
const { Double } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: Date,
        required: true
    },
    etime: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;