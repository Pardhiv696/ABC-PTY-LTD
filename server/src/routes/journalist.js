const express = require('express');
var router = express.Router();

let { User } = require('../models/user.js');
const { blogsModal } = require('../models/blogs.js');

router.get('/single-journalist', async (req, res) => {
    try {
        let { email } = req.query;

        let record = await User.findOne({ email: email, role: 'journalist' });
        if (!record) return res.status(400).json({ error: true, message: 'User does not exist' });

        return res.status(200).json({
            error: false,
            user: record,
            message: 'journalist Profile',
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
});

router.get('/all-journalists', async (req, res) => {
    try {
        const { page, limit, search } = req.query;
        let userData;
        let count;

        userData = await User.find({
            email: { $regex: search },
            role: 'journalist',
        })
            .skip((page - 1) * limit)
            .limit(limit)
            .select('-password')
            .exec();
        count = await User.find({
            email: { $regex: search },
            role: 'journalist',
        }).count();

        let record = [];
        for (let i = 0; i < userData.length; i++) {
            const blogCount = await blogsModal.find({ refID: userData[i]._id });
            let rec = {
                ...userData[i]._doc,
                blogCount: blogCount.length,
            };
            record.push(rec);
        }

        return res.status(200).json({
            error: false,
            data: record,
            totalPage: Math.ceil(count / limit),
            message: 'journalist records',
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
});

module.exports = router;
