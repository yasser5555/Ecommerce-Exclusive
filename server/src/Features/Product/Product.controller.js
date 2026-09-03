const ProductService = require('./Product.services');

const getAllProducts = async (req, res) => {
  try {
    const products = await ProductService.getAllProducts();  
    res.status(200).json(products); 
    } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error: error.message });
    }
};
const getProductById = async (req, res) => {
  try {
    const product = await ProductService.getProductById(req.params.id);  
    res.status(200).json(product); 
    } catch (error) {
    res.status(500).json({ message: 'Error retrieving products', error: error.message });
    }
};
module.exports = {
  getAllProducts,
  getProductById,
};  
