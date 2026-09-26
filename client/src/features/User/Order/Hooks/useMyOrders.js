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
  const [statusFilter, setStatusFilter] = useState("all");

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

  const normalizeStatus = (value = "") =>
    String(value)
      .trim()
      .toLowerCase()
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ");

  const matchesStatusFilter = (orderStatus) => {
    const normalizedOrderStatus = normalizeStatus(orderStatus);
    const normalizedFilter = normalizeStatus(statusFilter);

    if (normalizedFilter === "all") return true;

    const aliases = {
      processing: ["processing", "pending", "in progress", "in-progress"],
      shipped: ["shipped", "shipping", "on the way", "in transit"],
      delivered: ["delivered", "completed"],
      cancelled: ["cancelled", "canceled", "rejected"],
    };

    return (aliases[normalizedFilter] || [normalizedFilter]).includes(
      normalizedOrderStatus,
    );
  };

  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((order) => matchesStatusFilter(order.status));

  const totalPage = Math.ceil(
    filteredOrders.length / orderPerPage
  );

  const startIndex =
    (currentPage - 1) * orderPerPage;

  const endIndex =
    startIndex + orderPerPage;

  const currentOrders = filteredOrders.slice(
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

  const handleStatusChange = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  return {
    search,
    orders,
    filteredOrders,
    currentOrders,
    currentPage,
    totalPage,
    startIndex,
    endIndex,
    orderPerPage,
    isloading,
    statusFilter,
    handlePrevious,
    handleNext,
    handlePageChange,
    handleSearchChange,
    clearSearch,
    handleStatusChange,
  };
};