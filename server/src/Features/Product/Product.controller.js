const ProductService = require("./Product.services");
const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const products = await ProductService.getAllProducts(page, limit);
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving products", error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await ProductService.getProductById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving products", error: error.message });
  }
};

const findProductByTitle = async (req, res) => {
     try {
     const product = await ProductService.findProductByTitle(req.query.title);
     res.status(200).json(product);
    } catch (error) {
    res.status(200).json({ message: "Error at findProductByTitle From Controller", error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  findProductByTitle,
};
