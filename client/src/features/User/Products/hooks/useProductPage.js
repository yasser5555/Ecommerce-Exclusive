import React, { useCallback } from "react";
import { useProducts } from "./useProductStore";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function useProductPage() {
  const {
    searchResults,
    products,
    pagination,
    FetchProducts,
    productSearch,
    filters,
    filterData,
  } = useProducts();

  const [searchParams, setSearchParams] = useSearchParams({
    page: 1,
    limit: 10,
  });

  const page = Number(searchParams.get("page"));
  const limit = Number(searchParams.get("limit"));

  const navigate = useNavigate();

  const search = useCallback(async () => {
    if (!searchResults.trim()) return;

    try {
      await productSearch(searchResults);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  }, [productSearch, searchResults]);

  const getProducts = useCallback(async () => {
    try {
      await FetchProducts({
        page,
        limit,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [FetchProducts, page, limit]);

  const filteredData = useCallback(async () => {
    try {
      await filterData(filters);
    } catch (error) {
      console.error("Error filtering products:", error);
    }
  }, [filterData, filters]);

  const handlePageChange = (newPage) => {
    setSearchParams({
      page: newPage,
      limit: limit,
    });
  };

  return {
    filters,
    searchResults,
    products,
    pagination,
    setSearchParams,
    limit,
    page,
    navigate,
    getProducts,
    search,
    filteredData,
    handlePageChange,
  };
}