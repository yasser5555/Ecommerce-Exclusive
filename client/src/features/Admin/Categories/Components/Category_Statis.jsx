import React, { useEffect } from "react";

export default function CategoryStatis({ category , fetchCategoryStatistics }) {
  useEffect(() => {
    const fetchStatis = async () => {
      try {
        await fetchCategoryStatistics();
      } catch (error) {
        console.error(`Error at Fetching Category Statis`);
      }
    };
    fetchStatis();
  }, [fetchCategoryStatistics]);
 

  return (
    <>
      <div className="row g-3 mb-4">
        <div className="col-md">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <small className="text-muted">Total Categories</small>

              <h3 className="fw-bold mb-0">
                {category?.[0]?.[0]?.Total_Categories}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-md">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
              <small className="text-muted">Total Products</small>
              <h3 className="fw-bold mb-0">
                {category?.[1]?.[0]?.Total_products}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
