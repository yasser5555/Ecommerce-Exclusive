import { useEffect } from "react";

export default function useHeavyFetchOnRender(fetchFunction, dependencies = [] || null) {
  useEffect(() => {
    fetchFunction();
  }, dependencies);
}
