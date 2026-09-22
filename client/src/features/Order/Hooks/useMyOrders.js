import { useEffect, useState } from "react";
import { useOrderStore } from "../Store/Orders.store";

export const useMyOrders = () => {
  const { orderHistory, FetchOrder, SearchOrders } = useOrderStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const orderPerPage = 5;

  // Fetch all orders or search orders with debounce.
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
        console.error(`Error at My Orders: ${error.message}`);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [search, FetchOrder, SearchOrders]);

  const orders = orderHistory?.data || [];

  const totalPage = Math.ceil(orders.length / orderPerPage);

  const startIndex = (currentPage - 1) * orderPerPage;
  const endIndex = startIndex + orderPerPage;

  const currentOrders = orders.slice(startIndex, endIndex);

  // Move to the previous page when possible.
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Move to the next page when possible.
  const handleNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Select a specific pagination page.
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Update search text.
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // Clear the current search.
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
    handlePrevious,
    handleNext,
    handlePageChange,
    handleSearchChange,
    clearSearch,
  };
};