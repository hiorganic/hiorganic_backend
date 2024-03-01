const router = require('express').Router()
const productController = require("../controllers/productController");
const requireUser = require("../middlewares/requireUser");

router.post("/create",requireUser, productController.createProduct);
router.get("/get",requireUser, productController.getProduct);
router.get("/get/:id",requireUser,productController.getProductById)
router.put("/update/:id",requireUser, productController.updateProductById);
router.delete("/delete/:id",requireUser, productController.deleteProduct);

module.exports = router;