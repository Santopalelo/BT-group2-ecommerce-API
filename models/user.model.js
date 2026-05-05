const mongoose = require("mongoose");
const { removeListener } = require("./product.model");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        default: "user",
        type: String
    }
}, { timestamps: true });

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;