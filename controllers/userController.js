
const asyncHander = require("express-async-handler")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const user = require("../models/userModel")
const { JsonWebTokenError } = require("jsonwebtoken")
//desc register user
//route POST /api/users
//access public
const registerUser = asyncHander(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400)
        throw new Error("give all details")
    }
    const userAvailable = await user.findOne({ email });
    if (userAvailable) {
        res.status(400)
        throw new Error("user already available")
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const createUser = await user.create({
        username,
        email,
        password: hashedPassword
    })
    console.log(`created ${currentUser}`);
    if (createUser) {
        res.status(201).json({ __id: createUser.id, email: createUser.email })
    } else {
        res.status(400)
        throw new Error("user data is not valid")
    }
    res.json({ message: "user register" })
})
//desc login user
//route GET /api/users
//access public
const loginUser = asyncHander(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const loginUser = await user.findOne({ email });

    if (loginUser && (await bcrypt.compare(password, loginUser.password))) {
        const accessToken = jwt.sign({
            loginUser: {
                username: loginUser.username,
                email: loginUser.email,
                id: loginUser._id,
            },
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });

        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Email or password not valid");
    }
});
//desc current user
//route GET /api/users
//access private
const currentUser = asyncHander(async (req, res) => {
    res.json(req.loginUser);
})

module.exports = { registerUser, loginUser, currentUser }