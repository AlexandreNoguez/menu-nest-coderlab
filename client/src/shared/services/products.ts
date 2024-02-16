import { toast } from "react-toastify";
import { api } from "./axios-config"
import { IProduct, IProductList } from "../types/IProduct";
import { AxiosResponse } from "axios";

export const createNewProduct = async (productDto: IProduct): Promise<any> => {
    try {

        const token = localStorage.getItem('token')
        if (token) {
            const parsedToken = JSON.parse(token);
            console.log(parsedToken);

            await api.post('/products', productDto, {
                headers: {
                    Authorization: `Bearer ${parsedToken.accessToken}`
                }
            })

            return toast.success("Produto criado com sucesso!")
        }

    } catch (error) {
        console.error(error);
        toast.error("Falha ao criar produto");
    }
}

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