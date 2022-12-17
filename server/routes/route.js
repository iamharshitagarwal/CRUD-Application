const express = require("express");
const router = express.Router();

const productCon = require("../controllers/controller");

router.post("/post", productCon.addProduct);
router.delete("/delete/:id", productCon.deleteProduct);
router.get("/getAll", productCon.getAllProduct);
router.get("/getOne/:id", productCon.getOneProduct);
router.put("/update/:id", productCon.updateProduct);


router.get("/search/:title",productCon.searchProduct);


module.exports = router;
