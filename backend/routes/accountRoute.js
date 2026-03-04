const express = require("express");
const { accountModel } = require("../db");
const { authMiddleware } = require("../auth/userMiddleware");
const mongoose = require("mongoose");
const accountRouter = express.Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
    try {
        const account = await accountModel.findOne({
            userId: req.userId
        });

        if (!account) {
            return res.status(404).json({
                message: "Account not found"
            });
        }

        res.json({
            balance: account.balance
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();


    session.startTransaction();
    const { amount, to } = req.body;
    try {

        //Fetch the account within the transaction
        const account = await accountModel.findOne({
            userId: req.userId
        }).session(session);

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            })
        }

        const toAccount = await accountModel.findOne({ userId: to }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid Account"
            })
        }

        // perform the transfer
        await accountModel.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await accountModel.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        //Commit the transaction
        await session.commitTransaction();
        res.json({
            message: "Transfer Successful"
        })
    } catch (e) {
        await session.abortTransaction();
        console.log(e);
        res.status(500).json({
            message: "Internal server error, Transaction Failed"
        })
    }
    await session.endSession();
})


module.exports = {
    accountRouter
}