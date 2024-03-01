const {Product,Category} = require("../models/Schema");

// console.log(Product);

const createProduct = async(req,res) =>{
    try {
        // const {productName , productDesc, ProductPrice,productBrand, category_title} = req.body
    const {productName, productDesc, categoryName, productBrand,productQuantity, ProductPrice} = req.body;

    const seller_id = req._id

    if (!productName || !productDesc || !ProductPrice) {
        return res.status(400).send("All fields are required");
    }

    const category = await Category.findOne({title: categoryName});


    const product = await Product.create({
        product_name:productName,
        product_description:productDesc,
        product_brand:productBrand,
        seller:seller_id,
        quantity:productQuantity,
        product_category:category._id,

        // image: productimage,
        poduct_price:ProductPrice
    });

    // const category = await Category.create({
    //     title: category_title
    // })
    category.products.push(product._id);
    await category.save();

    return res.status(200).json({
        message:"product created successfully",
        product_data:product
    })

    } catch (error) {
        console.log(error);
    }
}

const getProduct = async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await Product.find().populate('product_category').populate('seller');

        res.status(200).json(products);
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

const updateProductById = async (req,res) =>{
    try {
        const productId = req.params.id;
        const updates = req.body;

        console.log(updates);

        const product = await Product.findByIdAndUpdate(productId, updates, { new: true });

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
    createProduct,
    getProduct,
    getProductById,
    updateProductById,
    deleteProduct
}