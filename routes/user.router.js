const userController = require("../controller/user.controller");
const router = require("express").Router();

router.get("/", userController.read);
router.post("/", userController.create);
router.put("/update/:id", userController.update);
router.delete("/delete/:id", userController.delete);

module.exports = router;
