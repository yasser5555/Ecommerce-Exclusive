import { useProductStore } from './../store/product.store';
export const useProducts = () =>{
    return useProductStore();
}