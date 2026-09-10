import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "./useProductStore";

export default function useProductdetails() {
  const stars = [1, 2, 3, 4, 5];
  const { id } = useParams();
  const { productDetails, getproductDetials, isLoading, reviews } =
    useProducts();
  const [selectedImage, setSelectedImage] = useState("");

  const getProduct = async () => {
    try {
      await getproductDetials(id);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  const product = Array.isArray(productDetails)
    ? productDetails[0]
    : productDetails;

  const discountPercentage =
    product?.price && product?.price_after_discount
      ? Math.round(
          ((Number(product?.price) - Number(product?.price_after_discount)) /
            Number(product?.price)) *
            100,
        )
      : 0;
  const currentRating = Number(product?.rating) || 0;

  // ================= QUANTITY =================

  const maxQuantity = Math.min(Number(product?.stock) || 0, 10);

  const isExist = () =>{
  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h2>Product not found</h2>
        <p className="text-muted">
          The product you're looking for doesn't exist.
        </p>
      </div>
    );
  }
}
  return {
    product,
    productDetails,
    getproductDetials,
    isLoading,
    reviews,
    id,
    stars,
    selectedImage,
    setSelectedImage,
    getProduct,
    discountPercentage,
    currentRating,
    maxQuantity,
    isExist,
  };
}
