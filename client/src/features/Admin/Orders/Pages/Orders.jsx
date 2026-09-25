import React, { useEffect, useState } from "react";
import {
  Search,
  Eye,
  ShoppingCart,
  DollarSign,
  Clock,
  CheckCircle,
} from "lucide-react";
import OrdersHeader from "../Components/Orders Header";
import { useOrdersStore } from "../Store/Order.store";
import OrdersTable from "../Components/OrdersTable";

export default function Orders() {
  const { orders, fetchOrderStatistics } = useOrdersStore();

  useEffect(() => {
    const getStatis = async () => {
      try {
        await fetchOrderStatistics();
      } catch (error) {
        console.error(`error at Fetching Statis`);
      }
    };
    getStatis();
  }, [fetchOrderStatistics]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  return (
    <div className="container-fluid bg-light min-vh-100 p-4">
      <OrdersHeader
        fetchOrderStatistics={fetchOrderStatistics}
        orders={orders}
      />
      {/* Table */}

      <OrdersTable
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        orders={orders}
      />
    </div>
  );
}
