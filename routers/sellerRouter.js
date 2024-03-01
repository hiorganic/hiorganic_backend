const router = require('express').Router()
const sellerController = require("../controllers/sellerController");
const requireUser = require("../middlewares/requireUser");

router.post("/create", sellerController.createSeller);
router.get("/get", sellerController.getSeller);
router.put("/update", sellerController.updateSeller);
router.delete("/delete", sellerController.deleteSeller);

router.post("/login",sellerController.sellerLogin)

module.exports = router;