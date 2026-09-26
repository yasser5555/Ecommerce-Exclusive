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
const getOrderPageServices = async () => {
  try {
    const response = await AdminRepo.getOrderPage();
    return response;
  } catch (error) {
    throw new Error(`error at Admin.Services.getOrderPageServices ${error}`);
  }
};

const getAdminOrderDetailsService = async (order_id) => {
  try {
    const response = await AdminRepo.getAdminOrderDetails(order_id);
    return response;
  } catch (error) {
    throw new Error(
      `error at Admin.Services.getAdminOrderDetailsService ${error}`,
    );
  }
};
const getallusersServices = async () => {
  try {
    const response = await AdminRepo.getallusers();
    return response;
  } catch (error) {
    throw new Error(
      `error at Admin.Services.getallusersServices ${error}`,
    );
  }
};
const getActiveUsersServices = async () => {
  try {
    const response = await AdminRepo.getActiveUsers();
    return response;
  } catch (error) {
    throw new Error(
      `error at Admin.Services.getActiveUsersServices ${error}`,
    );
  }
};
const getBlockedUsersServices = async () => {
  try {
    const response = await AdminRepo.getBlockedUsers();
    return response;
  } catch (error) {
    throw new Error(
      `error at Admin.Services.getBlockedUsersServices ${error}`,
    );
  }
};
const getAdminUsersServices = async () => {
  try {
    const response = await AdminRepo.getAdminUsers();
    return response;
  } catch (error) {
    throw new Error(
      `error at Admin.Services.getAdminUsersServices ${error}`,
    );
  }
};
const getRegularUsersServices = async () => {
  try {
    const response = await AdminRepo.getRegularUsers();
    return response;
  } catch (error) {
    throw new Error(
      `error at Admin.Services.getRegularUsersServices ${error}`,
    );
  }
};
const delete_userServices = async (user_id) => {
  try {
    const response = await AdminRepo.delete_user(user_id);
    return response;
  } catch (error) {
    throw new Error(
      `error at Admin.Services.delete_userServices ${error}`,
    );
  } 
};
const update_user_statusServices = async (user_id, new_status) => {
  try {
    const response = await AdminRepo.update_user_status(user_id, new_status);
    return response;
  } catch (error) {
    throw new Error(
      `error at Admin.Services.update_user_statusServices ${error}`,
    );
  }
};
const search_userServices = async (searchTerm) => {
  try {
    const response = await AdminRepo.search_user(searchTerm);
    return response;
  } catch (error) {
    throw new Error(
      `error at Admin.Services.search_userServices ${error}`,
    );
  }
};
const modify_user_roleServices = async (user_id, new_role) => {
  try {
    const response = await AdminRepo.modify_user_role(user_id, new_role);
    return response;
  } catch (error) {
    throw new Error(
      `error at Admin.Services.modify_user_roleServices ${error}`,
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
  getOrderPageServices,
  getAdminOrderDetailsService,
  getallusersServices,
  getActiveUsersServices,
  getBlockedUsersServices,
  getAdminUsersServices,
  getRegularUsersServices,
  delete_userServices,
  update_user_statusServices,
  search_userServices,
  modify_user_roleServices,
};
