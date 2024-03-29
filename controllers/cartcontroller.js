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
        let existingProduct = false
        for(i = 0 ;i<= existingCart._doc.products.length; i++){
            if (existingCart._doc.products[i]._doc.productId == productid){
                console.log(existingCart._doc.products[i]);
                // existingCart._doc.products[i]._doc.quantity = quantity
                existingCart.products[i].quantity = quantity
                await existingCart.save()
                existingProduct = true
                break;
            }
        }
        if(existingProduct === false){
            existingCart._doc.products.push({productId:productid,quantity:quantity})
            await existingCart.save()
        }
        
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

        const userId = req._id;
        const productId = req.params.id;
        const {quantity} = req.body;

        const cart = await Cart.findOne({ user:userId})
        console.log(cart);

        const updatedCart = await Cart.findOneAndUpdate(
            { user: userId, "products.productId": productId },
            { $set: { "products.$.quantity": quantity } },
            { new: true }
        );

        if (!updatedCart) {
            return res.status(404).send('Product or user not found in the cart');
        }

        res.status(200).json(updatedCart);
    } catch (err) {
        // console.error(error);
        // res.status(500).json({ error: 'Server error' });
        res.status(400).json({ message: err.message });
    }
}

const deleteCart = async (req,res) => {
    try {
        const userId = req._id;
        const productId = req.params.id;

        const cart = await Cart.findOne({ user:userId})

        if (!cart) {
            return res.status(404).send('Cart not found for the user');
        }
        let productIndex
        for(i = 0 ;i<=cart.products.length;i++){
            console.log(cart.products[i]._doc.productId === productId);
            productIndex = i
            break;
        }

        if (productIndex === -1) {
            return res.status(404).send('Product not found in the cart');
        }

        cart.products.splice(productIndex, 1);
        await cart.save();


        // const productIndex = cart.products.findIndex(product => product === productId);

        

        // const productIndex = cart._doc.products.findIndex(product => product.productId === productId);
        // const updatedCart = await Cart.findOneAndDelete(
        //     { user: userId, "products.productId": productId }
        // );

        // console.log(productIndex);

        // if (productIndex === -1) {
        //     return res.status(404).send('Product not found in the cart');
        // }

        // cart.products.splice(productIndex, 1);
        // await cart.save();

        // const product = await Product.findByIdAndDelete(cartId);
        // if (!product) {
        //     return res.status(404).json({ error: 'Cart not found' });
        // }

        res.status(200).json({ message: 'Cart Product deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}


module.exports={
    additem,
    getCartProduct,
    getProductById,
    updateCartProductById,
    deleteCart
}