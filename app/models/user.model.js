const mongoose = require("mongoose");
const passwordLocalMongoose = require("passport-local-mongoose");
const Schema  = mongoose.Schema;

const UserAccount = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: String
    },{
        timestamps: true
    });

UserAccount.plugin(passwordLocalMongoose);

module.exports = mongoose.model("userAccount", UserAccount);

