const ProductRepository = require("./Product.repository");
// For Products page
const getAllProducts = async (page, limit) => {
  try {
    page = Number(page);
    limit = Number(limit);
    const startIndex = (page - 1) * limit;
    const products = await ProductRepository.getAllProducts(limit, startIndex);
    const totalProducts = await ProductRepository.getProductsCount();
    const totalPages = Math.ceil(totalProducts / limit);
    const result = {
      data: products,
      pagination: {
        currentPage: page,
        limit: limit,
        totalProducts: totalProducts,
        totalPages: totalPages,
      },
    };
    // Previous page
    if (page > 1) {
      result.pagination.prev = page - 1;
    }
    // Next page
    if (page < totalPages) {
      result.pagination.next = page + 1;
    }
    return result;
  } catch (error) {
    throw new Error(`error at Product.services.getAllProducts ===> ${error}`);
  }
};

// For product-page
const getProductById = async (product_id) => {
  try {
    const products = await ProductRepository.getProductById(product_id);
    return products;
  } catch (error) {
    throw new Error(`error at Product.services.getAllProducts ===> ${error}`);
  }
};

const findProductByTitle = async (title) => {
  try {
    // 7. Call repository
    const products = await ProductRepository.findProductByTitle(title);
    return products;
  } catch (error) {
    throw new Error(
      `error at Product.services.findProductByTitle ===> ${error}`,
    );
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  findProductByTitle,
};
