const User = require("../model/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


const register = async (req, res) => {
    const checkMail = await User.findOne({ email: req.body.email })
    if (checkMail) {
        res.status(400).json("already using E-mail")
    } else {
        try {
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: CryptoJS.AES.encrypt(
                    req.body.password,
                    process.env.PASS_SEC
                ).toString(),
            });
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

const login = async(req,res)=> {
    try {
        const user = await User.findOne({username:req.body.username});
        !user && res.status(401).json("Wrong credentials!");

        const hashedPassword = CryptoJS.AES.decrypt(user.password,process.env.PASS_SEC);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        originalPassword !== req.body.password && res.status(401).json("Wrong credentials!");

        const accesToken = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_SEC,{expiresIn:"3d"});

        res.status(200).json({
            "userId":user.id,
            "accesToken":accesToken
    })
    } catch (error) {
        res.send(error)
    }
}

module.exports = {
    register,login
}

