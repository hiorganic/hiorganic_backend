const router = require('express').Router()
const productController = require("../controllers/productController");
const requireSeller = require("../middlewares/requireSeller");

router.post("/create",requireSeller, productController.createProduct);
router.get("/get",requireSeller, productController.getProduct);
router.get("/get/:id",requireSeller,productController.getProductById)
router.put("/update/:id",requireSeller, productController.updateProductById);
router.delete("/delete/:id",requireSeller, productController.deleteProduct);

module.exports = router;