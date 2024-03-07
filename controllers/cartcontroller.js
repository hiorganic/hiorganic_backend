const {Cart,Product} = require("../models/Schema");



const additem = async(req,res) =>{
    try {

        const {productid,quantity} = req.body;
        const user_id = req._id

    if (!productid || !quantity) {
        return res.status(400).send("All fields are required");
    }

    const product = await Product.findById(productid);

    if(!product) return res.status(400).send("Product not found");

    const existingCart = await Cart.findOne({user:user_id}) 
    
    let productCart

    if(existingCart){
        existingCart._doc.products.push({productId:productid,quantity:quantity})
        await existingCart.save()
    }

    else{
        productCart = await Cart.create({
            user:user_id
        });
        productCart._doc.products.push({productId:productid,quantity:quantity})
        await productCart.save();
    }

    

    // if(!existingCart) {
        
    // }
    
    
    // const productCart = await Cart.create({
    //     user:user_id
    // });
    // productCart._doc.products.push({productid,quantity})

    // await productCart.save();

    return res.status(200).json({
        message:"product created successfully",
        cart_data:productCart || existingCart
    })

    } catch (error) {
        console.log(error);
    }
}

const getCartProduct = async (req, res) => {
    try {
        const user = req._id
        // Fetch all products from the database
        const cart = await Cart.findOne({user})

        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getProductById = async (req,res) =>{
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        res.json(product);
    } catch (err) {
        res.status(404).json({ message: 'Product not found' });
    }
}

const updateCartProductById = async (req,res) =>{
    try {
        const productId = req.params.id;
        const updates = req.body;

        console.log(updates);

        const product = await Cart.findByIdAndUpdate(productId, updates, { new: true });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (err) {
        // console.error(error);
        // res.status(500).json({ error: 'Server error' });
        res.status(400).json({ message: err.message });
    }
}

const deleteProduct = async (req,res) => {
    try {
        const productId = req.params.id;

        const product = await Product.findByIdAndDelete(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
        // res.status(404).json({ message: 'Product not found' });
    }
}


module.exports={
    additem,
    getCartProduct,
    getProductById,
    updateCartProductById,
    deleteProduct
}