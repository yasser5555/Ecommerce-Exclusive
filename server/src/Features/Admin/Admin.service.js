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
    throw new Error(`error at Admin.Service.getAllProductService ${error}`);
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

const getAdminProductPageService = async () => {
  try {
    const response = await AdminRepo.getAdminProductPage();
    return response;
  } catch (error) {
    throw new Error(
      `error at Admin.Services.getAdminProductPageService ${error}`,
    );
  }
};

const Search_ProductService = async (Title) => {
  try {
    const data = await AdminRepo.Search_Product(Title);
    return data;
  } catch (error) {
    throw new Error(`error at Admin.repo.Search_ProductService ${error}`);
  }
};
const getOutOfStockServices = async () => {
  try {
    const response = await AdminRepo.getOutOfStock();
    return response;
  } catch (error) {
    throw new Error(`error at Admin.repo.getOutOfStockServices ${error}`);
  }
};

const getLowStockServices = async () => {
  try {
    const response =  await AdminRepo.getLowStock();
    return response;
  } catch (error) {
    throw new Error(`error at Admin.repo.getLowStockServices ${error}`);
  }
};
const update_productServices = async (column, New_value, product_id) => {
  try {
    const response = await AdminRepo.update_product(column, New_value, product_id);
    return response;
  } catch (error) {
    throw new Error(`error at Admin.Services.update_productServices ${error}`);
  }
};

const GetCatogeriesServices = async () => {
  try {
    const response = await AdminRepo.GetCatogeries();
    return response;
  } catch (error) {
    throw new Error(`error at Admin.Services.GetCatogeries ${error}`);
  }
};

const getCatogeryPageService = async () => {
  try {
    const response = await AdminRepo.getCatogeryPage();
    return response;
  } catch (error) {
    throw new Error(`error at Admin.Services.getCatogeryPageService ${error}`);
  }
};

const CreateCatogeryServices = async (name) => {
  try {
    const response = await AdminRepo.CreateCatogery(name);
    return response;
  } catch (error) {
    console.error(`error at Admin.Services..getCatogeryPage ${error.message}`);
  }
};
const DeleteCatogeryServices = async (category_id) => {
  try {
    const response = await AdminRepo.DeleteCatogery(category_id);
    return response;
  } catch (error) {
    console.error(
      `error at Admin.Services.DeleteCatogeryServices ${error.message}`,
    );
  }
};
const updateCategeryNameServices = async (newName, category_id) => {
  try {
    const response = await AdminRepo.updateCategeryName(newName, category_id);
    return response;
  } catch (error) {
    console.error(
      `error at Admin.Services.updateCategeryNameServices ${error.message}`,
    );
  }
};

module.exports = {
  createProductService,
  getAllProductService,
  deleteProductService,
  update_ProductService,
  getAdminDashboardService,
  getAdminProductPageService,
  Search_ProductService,
  getLowStockServices,
  getOutOfStockServices,
  update_productServices,
  GetCatogeriesServices,
  getCatogeryPageService,
  CreateCatogeryServices,
  DeleteCatogeryServices,
  updateCategeryNameServices,
};
