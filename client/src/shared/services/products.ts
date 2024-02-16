import { toast } from "react-toastify";
import { api } from "./axios-config"
import { IProductList } from "../types/IProduct";
import { AxiosResponse } from "axios";

export const getAllProducts = async (): Promise<IProductList> => {
    try {
        const { data }: AxiosResponse<IProductList> = await api.get(`/products`)

        return data

    } catch (error) {
        console.error(error);
        toast.error("Houve uma falha ao carregar os produtos");
        throw error
    }
}

export const addSampleData = async (): Promise<void> => {
    try {
        const { data }: AxiosResponse<void> = await api.post("/categories");

        return data;
    } catch (error) {

    }
}