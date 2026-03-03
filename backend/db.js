const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {type: String, required: true, length: 255, unique: true},
    firstName: {type: String},
    lastName: {type: String},
    password: {type: String, length: 18}
});

const accountSchema = mongoose.Schema({
    balance: {type: Number, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
})
// NOTE FOR Storing balance in DB => In real world, we should never store `floats` for balances in the database.
// You usually store a n integer which represents which the INR value with 
// decimal places (for eg, if someone has 33.33 rs in their account,
// you store 3333 in the database

// There is a certain precision that you need to support (which for india is 
// 2/4 decimal places) and this allows you to get rid of precision
// error by storing integers in your DB


const userModel = mongoose.model("User", userSchema);
const accountModel = mongoose.model("Account", accountSchema);

module.exports = {
    userModel, 
    accountModel
}