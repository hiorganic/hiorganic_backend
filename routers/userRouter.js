const router = require('express').Router();
const userController = require("../controllers/authController");

router.post("/signup", userController.signupController);
router.post("/login", userController.loginController);
router.get("/get", userController.getUser);
router.get("/get/:id", userController.getUserById);
router.put("/update/:id", userController.updateUserById);
router.delete("/delete/:id", userController.deleteUser);
router.post("/logout", userController.logoutController);



module.exports = router;