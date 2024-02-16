import { toast } from "react-toastify";
import { api } from "../axios-config";
import { IUser } from "../../types/IUser";

export const createNewUser = async (userDto: IUser): Promise<void> => {
    try {
        const response = await api.post('/users', userDto)
        console.log(response);

        toast.success("Cadstro enviado com sucesso!")
        return response.data

    } catch (error) {
        console.error(error);
        toast.error("Falha ao cadastrar novo usuário!")
    }

};