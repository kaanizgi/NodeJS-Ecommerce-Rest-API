const Product =  require("../model/Product")

//create New Product
const createProduct = async(req,res)=>{
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteProduct = async(req,res)=> {
    try {
        const product = await Product.findByIdAndDelete(req.body.id)
        res.status(200).json("succes")
    } catch (error) {
        res.status(400).json("some error")
    }
}

const updateProduct = async(req,res) => {
        try {
            const deletedProduct = await Product.findByIdAndUpdate(req.body.id,{$set:req.body})
            res.status(200).json("update succes")
        } catch (error) {
            res.status(404).json(error)
        }
}




//module export
module.exports = {createProduct,deleteProduct,updateProduct}