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
    try {
        // Fetch all products from the database
        const seller = await sellerProfile.find()

        res.status(200).json(seller);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getSellerById = async (req,res) =>{
    try {
        const sellerId = req.params.id;
        const seller = await sellerProfile.findById(sellerId);
        res.json(seller);
    } catch (err) {
        res.status(404).json({ message: 'seller not found' });
    }
}

const updateSeller = async (req,res) => {
    try {
        const sellerId = req.params.id;
        const updates = req.body;

        console.log(updates);

        const seller = await sellerProfile.findByIdAndUpdate(sellerId, updates, { new: true });

        if (!seller) {
            return res.status(404).json({ error: 'seller not found' });
        }

        res.status(200).json(seller);
    } catch (err) {
        // console.error(error);
        // res.status(500).json({ error: 'Server error' });
        res.status(400).json({ message: err.message });
    }
}

const deleteSeller = async (req,res) => {
    try {
        const sellerId = req.params.id;

        const seller = await sellerProfile.findByIdAndDelete(sellerId);

        if (!seller) {
            return res.status(404).json({ error: 'Seller not found' });
        }

        res.status(200).json({ message: 'seller Profile deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
        // res.status(404).json({ message: 'Product not found' });
    }
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
    getSellerById,
    updateSeller,
    deleteSeller,
    sellerLogin
}