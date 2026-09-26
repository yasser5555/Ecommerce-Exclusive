const Adminservice = require("./Admin.service");
const createProductController = async (req, res) => {
  try {
    const ProductPath = `uploads/products/${req.file.filename}`;
    const data = await Adminservice.createProductService(
      req.body.category_id,
      req.body.title,
      req.body.description,
      req.body.old_price,
      req.body.stock,
      ProductPath,
    );

    res.status(201).json({
      msg: "Product Created Successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      msg: `Error at Admin.controller.createProductController ${error}`,
    });
  }
};

const getAllProductController = async (req, res) => {
  try {
    const Products = await Adminservice.getAllProductService();
    res.json(Products).status(201);
  } catch (error) {
    res
      .json({
        msg: `Error at Admin.controller.createProductController ${error}`,
      })
      .status(500);
  }
};

const update_ProductController = async (req, res) => {
  try {
    const msg = await Adminservice.update_productServices(
      req.body.column,
      req.body.New_value,
      req.body.product_id,
    );
    res.json(msg).status(201);
  } catch (error) {
    res
      .json({
        msg: `Error at Admin.controller.update_Product ${error}`,
      })
      .status(500);
  }
};

const getAdminDashboardController = async (req, res) => {
  try {
    const data = await Adminservice.getAdminDashboardService();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      msg: `error at Admin.Service.getAdminDashboardService ${error}`,
    });
  }
};

const getAdminProductPageController = async (req, res) => {
  try {
    const response = await Adminservice.getAdminProductPageService();
    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json(`error at Admin.Controller.getAdminProductPageController ${error}`);
  }
};

const Search_ProductController = async (req, res) => {
  const { title } = req.body;
  try {
    const data = await Adminservice.Search_ProductService(title);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json(`error at Admin.Controller.Search_ProductService ${error}`);
  }
};

const getOutOfStockController = async (req, res) => {
  try {
    const Products = await Adminservice.getOutOfStockServices();
    res.status(200).json(Products);
  } catch (error) {
    res
      .status(500)
      .json(`error at Admin.Controller.getOutOfStockController ${error}`);
  }
};
const getLowStockController = async (req, res) => {
  try {
    const Products = await Adminservice.getLowStockServices();
    res.status(200).json(Products);
  } catch (error) {
    res
      .status(500)
      .json(`error at Admin.Controller.getOutLowStockController ${error}`);
  }
};

const deleteProductController = async (req, res) => {
  try {
    const msg = await Adminservice.deleteProductService(req.body.product_id);
    res.status(200).json(msg);
  } catch (error) {
    res
      .status(500)
      .json({ msg: `error at Adminservice.deleteProductController` });
  }
};
const GetCatogeriesController = async (req, res) => {
  try {
    const response = await Adminservice.GetCatogeriesServices();
    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ msg: `error at Admin.Controller.deleteProductController` });
  }
};

const getCatogeryPageController = async (req, res) => {
  try {
    const response = await Adminservice.getCatogeryPageService();
    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ msg: `error at Admin.Controller.getCatogeryPageController` });
  }
};

const CreateCatogeryController = async (req, res) => {
  try {
    const response = await Adminservice.CreateCatogeryServices(req.body.name);
    res.status(200).json(response);
  } catch (error) {
    (res.status(500),
      json({
        msg: `error at Admin.Controller.CreateCatogeryController ${error.message}`,
      }));
  }
};

const DeleteCatogeryController = async (req, res) => {
  try {
    const response = await Adminservice.DeleteCatogeryServices(
      req.body.category_id,
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      msg: `error at Admin.Controller.CreateCatogeryController ${error.message}`,
    });
  }
};
const updateCategeryNameController = async (req, res) => {
  try {
    const response = await Adminservice.updateCategeryNameServices(
      req.body.newName,
      req.body.category_id,
    );
    res.status(200).json(response);
  } catch (error) {
    console.error(
      `error at Admin.Controller.updateCategeryNameController ${error.message}`,
    );
  }
};

const getOrderPageController = async (req, res) => {
  try {
    const response = await Adminservice.getOrderPageServices();
    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ msg: `error at Admin.Controller.getOrderPageController` });
  }
};

const getAdminOrderDetailsController = async (req, res) => {
  try {
    const order_id = req.params.order_id; // || req.params.id;
    const response = await Adminservice.getAdminOrderDetailsService(
      req.params.order_id,
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      msg: `error at Admin.Controller.getAdminOrderDetailsController ${error.message}`,
    });
  }
};

const getallusersController = async (req, res) => {
  try {
    const response = await Adminservice.getallusersServices();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      msg: `error at Admin.Controller.getallusersController ${error.message}`,
    });
  }
};
const getActiveUsersController = async (req, res) => {
  try {
    const response = await Adminservice.getActiveUsersServices();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      msg: `error at Admin.Controller.getActiveUsersController ${error.message}`,
    });
  }
};
const getBlockedUsersController = async (req, res) => {
  try {
    const response = await Adminservice.getBlockedUsersServices();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      msg: `error at Admin.Controller.getBlockedUsersController ${error.message}`,
    });
  }
};
const getAdminUsersController = async (req, res) => {
  try {
    const response = await Adminservice.getAdminUsersServices();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      msg: `error at Admin.Controller.getAdminUsersController ${error.message}`,
    });
  }
};
const getRegularUsersController = async (req, res) => {
  try {
    const response = await Adminservice.getRegularUsersServices();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      msg: `error at Admin.Controller.getRegularUsersController ${error.message}`,
    });
  }
};
const delete_userController = async (req, res) => {
  try {
    const response = await Adminservice.delete_userServices(req.body.user_id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      msg: `error at Admin.Controller.delete_userController ${error.message}`,
    });
  }
};

const update_user_statusController = async (req, res) => {
  try {
    const response = await Adminservice.update_user_statusServices(
      req.body.user_id,
      req.body.new_status,
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      msg: `error at Admin.Controller.update_user_statusController ${error.message}`,
    });
  }
};
const search_userController = async (req, res) => {
  try {
    const response = await Adminservice.search_userServices(
      req.body.searchTerm,
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      msg: `error at Admin.Controller.search_userController ${error.message}`,
    });
  }
};
const modify_user_roleController = async (req, res) => {
  try {
    const response = await Adminservice.modify_user_roleServices(
      req.body.user_id,
      req.body.new_role,
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      msg: `error at Admin.Controller.modify_user_roleController ${error.message}`,
    });
  }
};

module.exports = {
  createProductController,
  getAllProductController,
  update_ProductController,
  getAdminDashboardController,
  getAdminProductPageController,
  Search_ProductController,
  getOutOfStockController,
  getLowStockController,
  deleteProductController,
  GetCatogeriesController,
  getCatogeryPageController,
  CreateCatogeryController,
  DeleteCatogeryController,
  updateCategeryNameController,
  getOrderPageController,
  getAdminOrderDetailsController,
  getallusersController,
  getActiveUsersController,
  getBlockedUsersController,
  getAdminUsersController,
  getRegularUsersController,
  delete_userController,
  update_user_statusController,
  search_userController,
  modify_user_roleController,
};
