import { useEffect } from "react";


export function FetchOnRender(fetchFunction , changeToRender = null) {
  useEffect(() => {
    fetchFunction();
  }, [changeToRender]);
}