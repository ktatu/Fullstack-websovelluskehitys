const usersRouter = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcryptjs")

usersRouter.get("/", async (req, res) => {
    const users = await User.find({}).populate("blogs", {
        title: 1,
        author: 1,
        url: 1,
    })

    res.json(users.map((user) => user.toJSON()))
})

usersRouter.post("/", async (req, res) => {
    const body = req.body
    console.log("req body ", body)
    if (body.password.length < 3) {
        return res
            .status(400)
            .json({ error: "Password minimum length 3 characters" })
    }

    const passwordHash = await bcrypt.hash(body.password, 10)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })
    const savedUser = await user.save()
    res.json(savedUser)
})

module.exports = usersRouter
