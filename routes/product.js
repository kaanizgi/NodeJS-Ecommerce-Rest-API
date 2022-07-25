const router = require("express").Router()
const verify = require("./verifyToken");
const productController = require("../controller/productController")

//routes
router.post("/",verify.verifyTokenAndAdmin,productController.createProduct);
router.delete("/",verify.verifyTokenAndAdmin,productController.deleteProduct);
router.put("/",verify.verifyTokenAndAdmin,productController.updateProduct)

//module exports
module.exports = router