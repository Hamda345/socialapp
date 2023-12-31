import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";
import user from "../models/User.js";

// Register user

export const register = async (req, res) => {
    try{
        const {
            firstname,
            lastname,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstname,
            lastname,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000)
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch(error) {
        res.status(500).json({error: err.message});
    }
}

//Logging In

export const login = async(req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        if (!user) return res.status(400).json({msg: "user does not exist. "});

        const isMatch = await bcrypt.compare(password, user.password);
    } catch(error) {
        res.status(500).json({error: err.message});
    }
}
