const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    products: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product' 
        }
    ]
});


const productSchema = new Schema({
    product_name:{
        type: String,
        required: true
    },
    product_description: {
        type: String,
        required: true
    },
    product_category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    product_brand:{
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    },
    ratings: {
        type: Number,
        default: 0
    },
    imageUrls: [
        {
            publicId: String,
            url: String
        }
    ],
    poduct_price:{
        type:Number,
        required: true
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'sellerProfile',
        required: true
    },
});


const sellerProfileSchema = new Schema({
    sellerName: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    companyName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    product_list: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
});


const userProfileSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    }
});





const Category = mongoose.model('Category', categorySchema);
const sellerProfile = mongoose.model('sellerProfile', sellerProfileSchema);
const Product = mongoose.model('Product', productSchema);
const User = mongoose.model('User', userProfileSchema);


module.exports = {Category, sellerProfile, Product, User}