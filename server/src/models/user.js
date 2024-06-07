var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var userSchema = mongoose.Schema({
    profilePic: String,
    name: String,
    email: String,
    password: String,
    walletAddress: String,
    walletID: Number,
    role: {
        type: String,
        default: 'journalist',
    },
    accountStatus: {
        type: Boolean,
        default: true,
    },
    intro: String,
    facebook: String,
    twitter: String,
    instagram: String,
    pinterest: String,
});
userSchema.methods.generateHashedPassword = async function () {
    let salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
};
var User = mongoose.model('User', userSchema);

module.exports.User = User;
