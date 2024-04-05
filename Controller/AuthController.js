const user = require('../model/User')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

const Register = async (req, res) => {
    const newuser = new user({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SECRET
        ).toString()
    })
    try {
        const savedProduct = await newuser.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        res.status(401).json(error);
    }
}

const Login = async (req, res) => {
    try {
        const User = await user.findOne({ username: req.body.username });

        if (!User) {
            return res.status(401).json({
                message: "User not Found!"
            });
        }

        const hashedPassword = CryptoJS.AES.decrypt(
            User.password,
            process.env.PASS_SECRET
        ).toString(CryptoJS.enc.Utf8);

        if (hashedPassword !== req.body.password) {
            return res.status(401).json({
                message: "Password does not Match!"
            });
        }

        const accesstoken = jwt.sign({
            id: User._id,
            isAdmin: User.isAdmin
        }, process.env.JWT_SECRET, { expiresIn: "3d" })

        const { password, ...others } = User._doc

        res.status(200).json({
            message: others, accesstoken
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = {
    Register,
    Login
}