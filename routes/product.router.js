const productController = require("../controller/product.controller");
const router = require("express").Router();

router.get("/", productController.read);
router.post("/", productController.create);
router.put("/update/:id_product", productController.update);
router.delete("/delete/:id_product", productController.delete);

module.exports = router;
