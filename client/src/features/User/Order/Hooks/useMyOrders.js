import { useEffect, useState } from "react";
import { useOrderStore } from "../Store/Orders.store";

export const useMyOrders = () => {
  const {
    orderHistory,
    FetchOrder,
    SearchOrders,
    isloading,
  } = useOrderStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const orderPerPage = 5;

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        setCurrentPage(1);

        if (search.trim() === "") {
          await FetchOrder();
          return;
        }

        await SearchOrders(search.trim());
      } catch (error) {
        console.error(
          `Error at My Orders: ${error.message}`
        );
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [search, FetchOrder, SearchOrders]);

  // orderHistory is always an array now
  const orders = Array.isArray(orderHistory)
    ? orderHistory
    : [];

  const totalPage = Math.ceil(
    orders.length / orderPerPage
  );

  const startIndex =
    (currentPage - 1) * orderPerPage;

  const endIndex =
    startIndex + orderPerPage;

  const currentOrders = orders.slice(
    startIndex,
    endIndex
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const clearSearch = () => {
    setSearch("");
  };

  return {
    search,
    orders,
    currentOrders,
    currentPage,
    totalPage,
    startIndex,
    endIndex,
    orderPerPage,
    isloading,
    handlePrevious,
    handleNext,
    handlePageChange,
    handleSearchChange,
    clearSearch,
  };
};