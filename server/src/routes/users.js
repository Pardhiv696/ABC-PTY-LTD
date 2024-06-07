const express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let { User } = require('../models/user.js');
const auth = require('../middlewares/auth.js');
const { MidId } = require('../models/midId.js');
const {
    walletGeneration,
    provider,
    contractAddress,
    tokenAbi,
    gasEstimationForAll,
} = require('../utils/utils.js');
const admin = require('../middlewares/admin.js');
const { Wallet, Contract } = require('ethers');

router.post('/signup', async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user)
            return res
                .status(400)
                .send({ error: true, message: 'User with given email already exist' });

        let walletCount = await MidId.findOne({ title: 'Wallet Count' });
        if (!walletCount) {
            walletCount = new MidId({ id: 0 });
            await walletCount.save();
        }
        let id = walletCount.id + 1;

        const midWallet = walletGeneration(id);
        const adminWallet = new Wallet(process.env.privateKey, provider);

        const contract = new Contract(contractAddress, tokenAbi, adminWallet);

        const fn = contract.estimateGas.grantRole;
        const data = [
            '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6',
            midWallet,
        ];
        const tx = await contract.grantRole(...data, {
            gasLimit: gasEstimationForAll(adminWallet.address, fn, data),
        });
        await tx.wait();
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            intro: req.body.intro,
            profilePic: req.body.profilePic,
            facebook: req.body.facebook,
            twitter: req.body.twitter,
            instagram: req.body.instagram,
            pinterest: req.body.pinterest,
            walletAddress: midWallet,
            walletID: id,
        });
        await user.generateHashedPassword();
        await user.save();
        walletCount.id = id + 1;
        await walletCount.save();

        res.status(200).json({
            error: false,
            message: 'User registered sucessfully',
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user)
            return res
                .status(400)
                .send({ error: true, message: 'User with given email does not exist' });

        let isValid = await bcrypt.compare(req.body.password, user.password);
        if (!isValid) return res.status(401).send({ error: true, message: 'Invalid Password' });
        let token = jwt.sign({ _id: user._id, email: user.email }, process.env.jwtPrivateKey);
        res.status(200).json({
            error: false,
            message: 'User Loggedin Successfully',
            token,
            user,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
});

router.get('/verify-token', auth, async (req, res) => {
    try {
        let user = req.user;
        res.status(200).json({ error: false, role: user.role });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
});

router.get('/get-profile', auth, async (req, res) => {
    try {
        let user = req.user;

        return res.status(200).json({
            error: false,
            user,
            message: 'User Profile',
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
});

router.get('/all-users', auth, admin, async (req, res) => {
    try {
        const { page, limit, role, search } = req.query;
        let userData;
        let count;
        if (role === 'all') {
            userData = await User.find({
                email: { $regex: search },
            })
                .skip((page - 1) * limit)
                .limit(limit)
                .select('-password')
                .exec();
            count = await User.find({
                email: { $regex: search },
            }).count();
        } else {
            userData = await User.find({
                role: role,
                email: { $regex: search },
            })
                .skip((page - 1) * limit)
                .limit(limit)
                .select('-password')
                .exec();
            count = await User.find({
                role: role,
                email: { $regex: search },
            }).count();
        }

        return res.status(200).json({
            error: false,
            data: userData,
            totalPage: Math.ceil(count / limit),
            message: 'user records',
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
});

router.post('/freezebyAdmin', auth, admin, async (req, res) => {
    try {
        let { email, status } = req.body;
        let userData = await User.findOne({ email: email });
        if (!userData) return res.status(400).json({ error: true, message: 'User does not exist' });

        userData.accountStatus = status;

        await userData.save();

        res.status(200).json({ error: false, message: 'Success' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
});

router.post('/deletebyAdmin', auth, admin, async (req, res) => {
    try {
        let { email } = req.body;
        let userData = await User.findOne({ email: email });
        if (!userData) return res.status(400).json({ error: true, message: 'User does not exist' });

        userData.deleteOne();

        res.status(200).json({ error: false, message: 'Success' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
});

module.exports = router;
