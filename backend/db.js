const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {type: String, required: true, length: 255, unique: true},
    firstName: {type: String},
    lastName: {type: String},
    password: {type: String, length: 18}
});


const userModel = mongoose.model("User", userSchema);

module.exports = {
    userModel
}