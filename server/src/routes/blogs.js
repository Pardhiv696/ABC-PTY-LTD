const express = require('express');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const router = express.Router();
const { blogsModal } = require('../models/blogs');
const { Wallet, Contract } = require('ethers');
const { tokenAbi, contractAddress, gasEstimationForAll, provider } = require('../utils/utils');
const { User } = require('../models/user');

router.post('/create', auth, async (req, res) => {
    try {
        let user = req.user;
        if (!user.accountStatus)
            return res.status(400).json({ message: `You're restricted`, error: true });
        const { blog, title, thumbnail } = req.body;
        if (!blog && !title && !thumbnail)
            return res.status(400).json({ message: 'Please provide all fields', error: true });

        await blogsModal.create({
            thumbnail,
            title,
            content: blog,
            refID: user._id,
        });

        return res.status(200).json({ message: 'Blog sent for approval', status: 'success' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
});

router.post('/update', auth, async (req, res) => {
    try {
        let user = req.user;
        if (!user.accountStatus)
            return res.status(400).json({ message: `You're restricted`, error: true });
        const { blog, title, id, thumbnail } = req.body;
        let record = await blogsModal.findOne({ _id: id });
        if (!record) return res.status(400).json({ message: 'Invalid Blog ID.', error: true });

        if (!blog && !title && !thumbnail)
            return res.status(400).json({ message: 'Please provide all fields', error: true });

        record.thumbnail = thumbnail;
        record.title = title;
        record.content = blog;
        record.approval = 'pending';
        await record.save();

        return res.status(200).json({ message: 'Blogs sent for approval', error: false });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
});

router.get('/get-all-by-admin', auth, admin, async (req, res) => {
    try {
        const { page, limit, search } = req.query;
        let blogsData;
        let count;

        blogsData = await blogsModal
            .find({
                title: { $regex: search },
            })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
        count = await blogsModal
            .find({
                title: { $regex: search },
            })
            .count();
        let record = [];
        for (let i = 0; i < blogsData.length; i++) {
            const user = await User.findOne({ _id: blogsData[i].refID });
            let rec = {
                ...blogsData[i]._doc,
                email: user.email,
                name: user.name,
            };
            record.push(rec);
        }

        return res.status(200).json({
            error: false,
            data: record,
            totalPage: Math.ceil(count / limit),
            message: 'all blogs by admin',
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
});

router.get('/view-journalist-blogs', auth, async (req, res) => {
    try {
        const { page, limit, search, email } = req.query;
        let blogsData;
        let count;

        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found', error: true });

        blogsData = await blogsModal
            .find({
                title: { $regex: search },
                refID: user._id,
            })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
        count = await blogsModal
            .find({
                title: { $regex: search },
                refID: user._id,
            })
            .count();

        return res.status(200).json({
            error: false,
            data: blogsData,
            totalPage: Math.ceil(count / limit),
            message: 'all blogs by admin',
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
});

router.post('/approval', auth, admin, async (req, res) => {
    try {
        const { id, decision } = req.body;
        console.log(id, decision);
        let record = await blogsModal.findOne({ _id: id });
        if (!record) return res.status(400).json({ message: 'Invalid Blog ID.', error: true });

        if (decision === 'rejected') {
            record.approval = 'rejected';
            await record.save();
            return res.status(200).json({ message: 'Blogs sent for review', error: false });
        }

        let user = await User.findOne({ _id: record.refID });

        const adminWallet = new Wallet(process.env.privateKey, provider);

        const contract = new Contract(contractAddress, tokenAbi, adminWallet);

        const fn = contract.estimateGas.safeMint;
        const data = [
            user.walletAddress,
            `http://localhost:4000/blogs/getSingle/${record._id.toString()}`,
        ];
        const tx = await contract.safeMint(...data, {
            gasLimit: gasEstimationForAll(adminWallet.address, fn, data),
        });
        await tx.wait();

        record.approval = 'approved';

        await record.save();

        return res.status(200).json({ message: 'Blogs approved', error: false });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
});

router.post('/feature-update', auth, admin, async (req, res) => {
    try {
        const { id, decision } = req.body;
        let record = await blogsModal.findOne({ _id: id });
        if (!record) return res.status(400).json({ message: 'Invalid Blog ID.', error: true });

        if (decision === 'featured') {
            record.flag = 'featured';
            await record.save();
            return res.status(200).json({ message: 'Blog featured', error: false });
        }

        record.flag = 'normal';

        await record.save();

        return res.status(200).json({ message: 'Blog removed from featured', error: false });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
});

router.get('/get-all', async (req, res) => {
    try {
        const { page, limit, search } = req.query;
        let blogsData;
        let count;

        blogsData = await blogsModal
            .find({
                title: { $regex: search },
                approval: 'approved',
            })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
        count = await blogsModal
            .find({
                title: { $regex: search },
                approval: 'approved',
            })
            .count();

        return res.status(200).json({
            error: false,
            data: blogsData,
            totalPage: Math.ceil(count / limit),
            message: 'all blogs',
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
});

router.get('/get-all-by-journalist', async (req, res) => {
    try {
        const { page, limit, search, id } = req.query;
        let blogsData;
        let count;

        blogsData = await blogsModal
            .find({
                title: { $regex: search },
                approval: 'approved',
                refID: id,
            })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
        count = await blogsModal
            .find({
                title: { $regex: search },
                approval: 'approved',
                refID: id,
            })
            .count();

        return res.status(200).json({
            error: false,
            data: blogsData,
            totalPage: Math.ceil(count / limit),
            message: 'all blogs',
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
});

router.get('/get-latest', async (_req, res) => {
    try {
        let blogsData = await blogsModal
            .find({
                approval: 'approved',
            })
            .sort({ createdAt: -1 })
            .limit(6)
            .exec();

        return res.status(200).json({
            error: false,
            data: blogsData,
            message: 'latest blogs',
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
});

router.get('/get-featured', async (_req, res) => {
    try {
        let blogsData = await blogsModal.find({
            approval: 'approved',
            flag: 'featured',
        });

        return res.status(200).json({
            error: false,
            data: blogsData,
            message: 'featured blogs',
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
});

router.get('/getSingle/:blogId', async (req, res) => {
    try {
        const { blogId } = req.params;
        const response = await blogsModal.findOne({ _id: blogId });
        if (!response)
            return res.status(400).json({
                message: 'failed to fetch blog',
                error: true,
            });

        let journalist = await User.findOne({ _id: response.refID });

        return res
            .status(200)
            .json({ message: 'Blog # ' + blogId, error: false, journalist, blog: response });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
});

router.get('/verify-authenticity', async (req, res) => {
    try {
        const { url } = req.query;
        // eslint-disable-next-line
        const id = url.match(/getSingle\/([^\/]+)/)[1];
        const response = await blogsModal.findOne({ _id: id });
        if (!response)
            return res.status(400).json({
                message: 'No Blog found',
                error: true,
            });

        let journalist = await User.findOne({ _id: response.refID });

        return res
            .status(200)
            .json({ message: 'Blog found', error: false, journalist, blog: response });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
});

module.exports = router;
