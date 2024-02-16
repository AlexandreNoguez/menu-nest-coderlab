import { toast } from "react-toastify";
import { api } from "./axios-config";
import { ICategoryList } from "../types/ICategory";

export const getAllCategories = async (): Promise<ICategoryList> => {
    try {
        const { data } = await api.get('/categories');
        console.log(data);

        return data
    } catch (error) {
        console.error(error);
        toast.error("Erro ao buscar categorias");
        throw error
    }
}