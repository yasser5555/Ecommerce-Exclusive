const Adminservice = require("./Admin.service");
const createProductController = async (req, res) => {
  try {
    const ProductPath = `uploads/Products/${req.file.filename}`;

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
    res.json({ msg: "Product Created Successfully", Products }).status(201);
  } catch (error) {
    res
      .json({
        msg: `Error at Admin.controller.createProductController ${error}`,
      })
      .status(500);
  }
};

const deleteProductController = async (req, res) => {
  try {
    const data = await Adminservice.deleteProductService(req.body.product_id);
    res.json({ msg: "Product Deleted Successfully", data }).status(201);
  } catch (error) {
    res
      .json({
        msg: `Error at Admin.controller.deleteProductController ${error}`,
      })
      .status(500);
  }
};

const update_ProductController = async (req, res) => {
  try {
    const msg = await Adminservice.update_ProductService(
      req.body.column,
      req.body.New_value,
      req.body.product_id,
    );
    res
      .json({ msg: `${req.body.column} Updated Successfully`, msg })
      .status(201);
  } catch (error) {
    res
      .json({
        msg: `Error at Admin.controller.update_ProductController ${error}`,
      })
      .status(500);
  }
};

const getAdminDashboardController = async (req, res) => {
  try {
    const data = await Adminservice.getAdminDashboardService();
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({
        msg: `error at Admin.Service.getAdminDashboardService ${error}`,
      });
  }
};

module.exports = {
  createProductController,
  getAllProductController,
  deleteProductController,
  update_ProductController,
  getAdminDashboardController,
};
