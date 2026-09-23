import { create } from "zustand";
import {
  createProductApi,
  deleteProductApi,
  getCatogeriesAPI,
  getLowStockApi,
  getOutOfStockApi,
  getProductAllAPI,
  getProductPageDataAPI,
  SearchProductAPI,
  update_ProductApi,
} from "../Api/AdminProduct.api";

export const useAdminProductStore = create((set, get) => ({
  // Product Page Data
  productPage: [],
  // Products-data
  products: [],
  // Search Result
  SearchedProduct: [],
  // Catogeries-menu
  Catogeries: [],
  loading: false,

  fetchProductPage: async () => {
    set({
      loading: true,
    });
    try {
      const response = await getProductPageDataAPI();
      set({
        productPage: response,
        loading: false,
      });

      return response;
    } catch (error) {
      set({
        loading: false,
      });
      console.error(`error at fetchDashBoard ${error}`);
    }
  },
  fetchProducts: async () => {
    set({
      loading: true,
    });
    try {
      const response = await getProductAllAPI();
      set({
        products: response,
        loading: false,
      });
      return response;
    } catch (error) {
      set({
        loading: false,
      });
      console.error(`error at fetchDashBoard ${error}`);
    }
  },
  SearchForProducts: async (title) => {
    set({
      loading: true,
    });
    try {
      const response = await SearchProductAPI(title);
      set({
        SearchedProduct: response,
        loading: false,
      });
      return response;
    } catch (error) {
      set({
        loading: false,
      });
      console.error(`error at fetchDashBoard ${error}`);
    }
  },
  getLowStock: async () => {
    set({
      loading: true,
    });
    try {
      const response = await getLowStockApi();
      set({
        products: response,
        loading: false,
      });
      return response;
    } catch (error) {
      set({
        loading: false,
      });
      console.error(`error at fetchDashBoard ${error}`);
    }
  },
  getOutOfStock: async () => {
    set({
      loading: true,
    });
    try {
      const response = await getOutOfStockApi();
      set({
        products: response,
        loading: false,
      });
      return response;
    } catch (error) {
      set({
        loading: false,
      });
      console.error(`error at fetchDashBoard ${error}`);
    }
  },
  deleteProduct: async (product_id) => {
    set({ loading: true });

    try {
      const response = await deleteProductApi(product_id);
      set((state) => ({
        // ! Modify products for Real time Soft Delete
        products: state.products.filter(
          (product) => (product.id || product.p_id) !== product_id,
        ),
        SearchedProduct: state.SearchedProduct.filter(
          (product) => (product.id || product.p_id) !== product_id,
        ),
        loading: false,
      }));
      return response;
    } catch (error) {
      set({ loading: false });
      console.error(`error at deleteProduct ${error}`);
      throw error;
    }
  },
  update_Product: async (column, New_value, product_id) => {
    set({
      loading: true,
    });
    try {
      const response = await update_ProductApi(column, New_value, product_id);
      set({
        loading: false,
      });
      return response;
    } catch (error) {
      set({ loading: false });
      console.error(`error at update_Product ${error}`);
      throw error;
    }
  },
  FetchCatogery: async () => {
    set({
      loading: true,
    });
    try {
      const response = await getCatogeriesAPI();
      set({
        Catogeries: response,
        loading: false,
      });
      return response;
    } catch (error) {
      set({ loading: false });
      console.error(`error at update_Product ${error}`);
      throw error;
    }
  },
 createProduct: async (
  category_id,
  title,
  description,
  old_price,
  stock,
  product_image
) => {
  set({
    loading: true,
  });

  try {
    const response = await createProductApi(
      category_id,
      title,
      description,
      old_price,
      stock,
      product_image
    );
    console.log(`Api Response is ${response}`);
    
    set({
      loading: false,
    });

    return response;
  } catch (error) {
    set({
      loading: false,
    });

    console.error(`error at createProduct ${error}`);
    throw error;
  }
},
}));
