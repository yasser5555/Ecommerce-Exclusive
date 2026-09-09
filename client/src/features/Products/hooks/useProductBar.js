import React, { useState } from "react";
import { useProducts } from "./useProductStore";

export default function useProductBar() {
  const { getSearchResult, getCatogeries, catogery, filters, getFilters , products } =
    useProducts();
  const [rating, setRating] = useState(null);
  const [Catogery, setCatogery] = useState(null);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [price, setPrice] = useState({
    min: "",
    max: "",
  });
  const [search, setSearch] = useState("");

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setCatogery(value);
    } else {
      setCatogery(null);
    }
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPrice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const filtered = {
      Catogery,
      rating,
      minprice: price.min,
      maxprice: price.max,
    };

    console.log("FILTER OBJECT:", filtered);

    getFilters(filtered);
    getSearchResult(search.trim());
  };

  const handleClear = () => {
    setSearch("");
    setCatogery(null);
    setRating(null);
    setPrice({
      min: "",
      max: "",
    });
    getFilters(Catogery, rating, price.min, price.max);

    getSearchResult("");
  };

  return {
    getSearchResult,
    getCatogeries,
    catogery,
    filters,
    rating,
    setRating,
    Catogery,
    setCatogery,
    isCategoriesOpen,
    setIsCategoriesOpen,
    price,
    setPrice,
    search,
    setSearch,
    handleCategoryChange,
    handlePriceChange,
    handleRatingChange,
    handleSubmit,
    handleClear,
    products
  };
}
