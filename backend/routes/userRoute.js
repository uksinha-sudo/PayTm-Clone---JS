const express = require("express");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const zod = require('zod');
const { userModel, accountModel } = require("../db");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
const { authMiddleware } = require("../auth/userMiddleware");
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

userRouter.post("/signup", async (req, res) => {
    const body = req.body;
    try {

        const { success } = signupSchema.safeParse(req.body);
        if (!success) {
            return res.json({
                message: "Email already taken / incorrect inputs"
            })
        }

        const existingUser = await userModel.findOne({
            username: body.username
        })

        if (existingUser) {
            return res.json({
                message: "Email already taken / User already Exists"
            })
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);

        const newUser = await userModel.create({
            username: body.username,
            password: hashedPassword,
            firstName: body.firstName,
            lastName: body.lastName
        });

        await accountModel.create({
            userId: newUser._id,
            balance: 1 + Math.random() * 10000
        })

        res.json({
            message: "User created successfully"
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: "Internal Server Error, Failed to Create account"
        })
    }

});

const signinSchema = zod.object({
    username: zod.string(),
    password: zod.string()
});


userRouter.post("/signin", async (req, res) => {
    try {

        const result = signinSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                message: "Wrong credentials / Incorrect Inputs"
            });
        }

        const { username, password } = result.data;

        const existingUser = await userModel.findOne({
            username
        });

        if (!existingUser) {
            return res.status(403).send({
                message: "User doesn't exists"
            })
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password)

        if (!passwordMatch) {
            return res.json({
                message: "Incorrect Credentials"
            })
        }

        const token = jwt.sign({
            userId: existingUser._id
        }, JWT_SECRET);

        res.send({
            message: "User logged in",
            token
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: "Internal server error, Failed to Sign In"
        })
    }


});

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
});

userRouter.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    try {

        if (!success) {
            res.status(411).json({
                message: "Error while updating information"
            })
        }

        await userModel.updateOne(req.body, {
            id: req.userId
        })

        res.json({
            message: "Updated successfully"
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Internal server Error, Failed to update information"
        })
    }
});


userRouter.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    try {
        const users = await userModel.find({
            $or: [{
                firstName: {
                    "$regex": filter
                }
            }, {
                lastName: {
                    "$regex": filter
                }
            }]
        })

        res.json({
            user: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Internal Server error, Failed to find user"
        })
    }
});


module.exports = userRouter;