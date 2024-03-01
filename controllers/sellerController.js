const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {sellerProfile} = require("../models/Schema")


const createSeller = async (req,res) => {
    try {
        const {name, email,password, companyName, location,phone, username} = req.body

        if (!name || !email || !password || !companyName || !location || !phone || !username) {
            return res.status(400).send("All fields are required");
        }

        const oldUser = await sellerProfile.findOne({ email });
        if (oldUser) {
            return res.status(409).send("User is already registered");
            
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const seller_profile = await sellerProfile.create({
            sellerName : name,
            email:email,
            password: hashedPassword,
            companyName,
            location,
            phone,
            username
        });

        return res.status(200).json({
            message:"seller created successfully",
            seller_data:seller_profile
        })


    } catch (error) {
        
    }

}


const getSeller = async (req,res) => {

}

const updateSeller = async (req,res) => {

}

const deleteSeller = async (req,res) => {

}

const sellerLogin = async (req,res) =>{
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("All fields are required");
        }

        const user = await sellerProfile.findOne({ email }).select('+password');

        if (!user) {
            // return res.status(404).send("User is not registered");
            return res.send(error(404, "User is not registered"));
        }

        const matched = await bcrypt.compare(password, user.password);

        if (!matched) {
            return res.status(403).send("Incorrect password");
        }

        const accessToken = generateAccessToken({
            _id: user._id,
        });

        res.cookie("jwt", accessToken, {
            httpOnly: true,
            secure: true,
        });

        return res.status(200).send({ accessToken });


    } catch (error) {
        return res.status(403).send(error.message);
    }
}


const generateAccessToken = (data) => {
    try {
        const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
            expiresIn: "1d",
        });
        console.log(token);
        return token;
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    createSeller,
    getSeller,
    updateSeller,
    deleteSeller,
    sellerLogin
}