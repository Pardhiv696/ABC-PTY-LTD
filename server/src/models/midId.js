var mongoose = require('mongoose');

var walletIdSchema = mongoose.Schema({
    title: {
        type: String,
        default: 'Wallet Count',
    },
    id: {
        type: Number,
        default: 0,
    },
});

var midID = mongoose.model('midID', walletIdSchema);

module.exports.MidId = midID;
