const AdminRepo = require("./Admin.repo");
const createProductService = async (
  category_id,
  title,
  description,
  old_price,
  stock,
  product_image,
) => {
  try {
    const msg = await AdminRepo.createProduct(
      category_id,
      title,
      description,
      old_price,
      stock,
      product_image,
    );
    return msg;
  } catch (error) {
    throw new Error(`error at Admin.Service.createProductService ${error}`);
  }
};

const getAllProductService = async () => {
  try {
    const Products = await AdminRepo.getAllProduct();
    return Products;
  } catch (error) {
    throw new Error(`error at Admin.Service.getAllProductService`);
  }
};

const deleteProductService = async (product_id) => {
  try {
    const msg = await AdminRepo.deleteProduct(product_id);
    return msg;
  } catch (error) {
    throw new Error(`error at Admin.repo.CreateProduct`);
  }
};
//
const update_ProductService = async (column, New_value, product_id) => {
  try {
    const msg = await AdminRepo.update_Product(column, New_value, product_id);
    return msg;
  } catch (error) {
    throw new Error(`error at Admin.Service.update_ProductService`);
  }
};
const getAdminDashboardService = async () => {
  try {
    const data = await AdminRepo.getAdminDashboard();
    return data;
  } catch (error) {
    throw new Error(`error at Admin.Service.getAdminDashboardService ${error}`);
  }
};

module.exports = {
  createProductService,
  getAllProductService,
  deleteProductService,
  update_ProductService,
  getAdminDashboardService,
};
