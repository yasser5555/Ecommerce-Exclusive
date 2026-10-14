import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import scrollToTop from "../Utils/scrollToTop";

export default function BlockedLayout() {
  const { key } = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [key]);

  return (
    <>
      <Outlet />
    </>
  );
}