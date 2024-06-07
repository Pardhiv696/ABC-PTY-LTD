const mongoose = require('mongoose');

const blogsSchema = new mongoose.Schema(
    {
        thumbnail: String,
        title: String,
        content: String,
        refID: {
            ref: 'User',
            type: mongoose.Schema.Types.ObjectId,
        },
        approval: {
            type: String,
            default: 'pending',
        },
        flag: {
            type: String,
            default: 'regular',
        },
    },
    { timestamps: true },
);

const blogsModal = mongoose.model('blogs', blogsSchema);

module.exports.blogsModal = blogsModal;
