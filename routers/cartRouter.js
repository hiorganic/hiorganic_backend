const router = require('express').Router()
const cartController = require("../controllers/cartcontroller");
const requireUser = require("../middlewares/requireUser");

router.post("/add-item",requireUser, cartController.additem);
router.get("/get-item",requireUser, cartController.getCartProduct);
// router.get("/get/:id",requireUser,cartController)
router.put("/update/:id",requireUser, cartController.updateCartProductById);
router.delete("/delete/:id",requireUser, cartController.deleteCart);

module.exports = router;