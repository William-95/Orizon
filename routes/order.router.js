const orderController = require("../controller/order.controller");
const router = require("express").Router();

router.get("/", orderController.read);
router.post("/", orderController.create);
router.put("/update/:id_order", orderController.update);
router.delete("/delete/:id_order", orderController.delete);
// filter by req.query
router.get("/filter", orderController.filterDate);
router.get("/filter", orderController.filterProducts);

module.exports = router;
