import React, { useEffect } from "react";
import ProductCard from "../component/Product-card";
import { useProductsStore } from "../hooks/useProductStore";
import Productdetails from "./Productdetails";
import { useNavigate } from "react-router-dom";

export default function Productspage() {
  const navigate = useNavigate();
  const { products, FetchProducts } = useProductsStore();

  useEffect(() => {
    const getProducts = async () => {
      try {
        await FetchProducts();
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, []);

  return (
    <div className="container py-5">
      <div className="row g-4">
        {products?.map((product) => (
          <div key={product.id} className="col-6 col-md-4 col-lg-3">
            <ProductCard
              product={product}
              callback={() => {
                console.log(product?.id);
                
                navigate(`/products/${product?.id}`)
              }}
            />
          </div>
        ))}
      </div>
      
    </div>
  );
}
