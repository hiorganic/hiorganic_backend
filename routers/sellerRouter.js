const router = require('express').Router()
const sellerController = require("../controllers/sellerController");
const requireSeller = require("../middlewares/requireSeller");

router.post("/create", sellerController.createSeller);
router.get("/get", sellerController.getSeller);
router.get("/get/:id", sellerController.getSellerById);
router.put("/update/:id",requireSeller, sellerController.updateSeller);
router.delete("/delete/:id",requireSeller, sellerController.deleteSeller);

router.post("/login",sellerController.sellerLogin)

module.exports = router;