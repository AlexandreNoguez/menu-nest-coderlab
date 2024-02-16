import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { createNewUser } from "../shared/services/auth/AuthService";
import { IUser } from "../shared/types/IUser";

export const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IUser>();
    const navigate = useNavigate();

    const onSubmit = async (data: IUser) => {
        console.log(data);
        await createNewUser(data);

        navigate("/")
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">Cadastro de Usuário</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
                    <input
                        type="text"
                        id="name"
                        {...register('name', { required: 'Este campo é obrigatório' })}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        {...register('email', { required: 'Este campo é obrigatório' })}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
                    <input
                        type="password"
                        id="password"
                        {...register('password', { required: 'Este campo é obrigatório' })}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">Função</label>
                    <select
                        id="role"
                        {...register('role', { required: 'Este campo é obrigatório' })}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    >
                        <option value="ADMIN">Admin</option>
                        <option value="USER">Usuário</option>
                    </select>
                    {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
                </div>
                <div className="flex justify-evenly mt-6 ">
                    <Link to={"/"}>
                        <button
                            type="button"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        >
                            Cancelar
                        </button>
                    </Link>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Cadastrar Usuário
                    </button>
                </div>
            </form>
        </div>
    );
};