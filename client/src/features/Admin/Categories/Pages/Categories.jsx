 
import React, { useEffect, useState } from "react";

import CategoryHeader from "../Components/Category_Header";
import CategoryStatis from "../Components/Category_Statis";
import CategoryTable from "../Components/CategoryTable";
import CategoryModal from "../Components/CategoryModal";

import { useCategoriesStore } from "../Store/Categories.store";

export default function Categories() {
  const {
    fetchCategoryStatistics,
    updateCategory,
    createCategory,
    deleteCategory,
    category,
    loading,
  } = useCategoriesStore();

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
  });

  const categoriesPerPage = 5;

  useEffect(() => {
    const getCategoryData = async () => {
      try {
        await fetchCategoryStatistics();
      } catch (error) {
        console.error(
          `error at Categories.page.getCategoryData: ${error.message}`,
        );
      }
    };

    getCategoryData();
  }, [fetchCategoryStatistics]);

  const categoryList = category?.[2] || [];

  const filteredCategories = categoryList.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(
    filteredCategories.length / categoriesPerPage,
  );

  const startIndex =
    (currentPage - 1) * categoriesPerPage;

  const currentCategories = filteredCategories.slice(
    startIndex,
    startIndex + categoriesPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handleCreate = () => {
    setEditingCategory(null);

    setFormData({
      name: "",
    });

    setShowModal(true);
  };

  const handleEdit = (categoryItem) => {
    setEditingCategory(categoryItem);

    setFormData({
      name: categoryItem.name || "",
    });

    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingCategory) {
        await updateCategory(
          formData.name,
          editingCategory.category_id,
        );
      } else {
        await createCategory(formData.name);
      }

      await fetchCategoryStatistics();

      closeModal();
    } catch (error) {
      console.error(
        `error at Categories.page.handleSubmit: ${error.message}`,
      );
    }
  };

  const handleDelete = async (categoryItem) => {
    if (!categoryItem.category_id) {
      console.error(
        "error at Categories.page.handleDelete: category id is not available",
      );

      return;
    }

    try {
      await deleteCategory(categoryItem.category_id);

      await fetchCategoryStatistics();

      if (
        currentCategories.length === 1 &&
        currentPage > 1
      ) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      console.error(
        `error at Categories.page.handleDelete: ${error.message}`,
      );
    }
  };

  const closeModal = () => {
    setShowModal(false);

    setEditingCategory(null);

    setFormData({
      name: "",
    });
  };

  return (
    <div className="container-fluid bg-light min-vh-100 p-4">
      <CategoryHeader handleCreate={handleCreate} />

      <CategoryStatis
        fetchCategoryStatistics={fetchCategoryStatistics}
        category={category}
      />

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <CategoryTable
          categories={currentCategories}
          search={search}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <div className="border-top bg-white px-4 py-3">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <small className="text-muted">
              {filteredCategories.length > 0
                ? `Showing ${startIndex + 1}-${Math.min(
                    startIndex + categoriesPerPage,
                    filteredCategories.length,
                  )} of ${
                    filteredCategories.length
                  } categories`
                : "Showing 0 categories"}
            </small>

            {totalPages > 1 && (
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="page-link text-danger"
                      onClick={() =>
                        setCurrentPage(currentPage - 1)
                      }
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                  </li>

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1,
                  ).map((page) => (
                    <li
                      key={page}
                      className="page-item"
                    >
                      <button
                        type="button"
                        className={`page-link ${
                          currentPage === page
                            ? "bg-danger text-white border-danger"
                            : "text-danger"
                        }`}
                        onClick={() =>
                          setCurrentPage(page)
                        }
                      >
                        {page}
                      </button>
                    </li>
                  ))}

                  <li
                    className={`page-item ${
                      currentPage === totalPages
                        ? "disabled"
                        : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="page-link text-danger"
                      onClick={() =>
                        setCurrentPage(currentPage + 1)
                      }
                      disabled={
                        currentPage === totalPages
                      }
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>

      <CategoryModal
        showModal={showModal}
        editingCategory={editingCategory}
        formData={formData}
        loading={loading}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onClose={closeModal}
      />
    </div>
  );
}

