import { useState } from "react"
import { Link } from "react-router-dom"
import { ILogin } from "../shared/types/ILogin";
import { useForm } from "react-hook-form";
import { useAuth } from "../shared/contexts/AuthContext";

export const Login = () => {
    const { login } = useAuth();

    const { register, handleSubmit, watch, formState: { errors } } = useForm<ILogin>();
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (data: ILogin) => {
        try {

            const response = await login(data.email, data.password);


        } catch (error) {
            setError("Falha ao fazer login. Verifique suas credenciais.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen gap-8 px-8 flex-wrap" id="login">
            <div className="max-w-80">
                <h1 className="text-center text-xl mb-4">Menu App</h1>
                <p className="text-justify">
                    Fale com um admnistrador, crie uma conta admnistradora e gerencie um cardápio de restaurante adicionando, editando e deletando os pratos que estarão disponíveis!
                </p>
            </div>
            <form
                className="flex flex-col w-full max-w-80"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex flex-col gap-2">
                    <label htmlFor="email">E-mail</label>
                    <input
                        className="px-2"
                        autoComplete="on"
                        type="email"
                        id="email"
                        {...register("email", { required: true, minLength: 8 })}
                    />
                    {errors.email && <span className="error  bg-slate-200 text-black px-4">E-mail é obrigatório</span>}
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password">Senha</label>
                    <input
                        className="px-2"
                        autoComplete="on"
                        type="password"
                        id="password"
                        {...register("password", { required: true, minLength: 5 })}
                    />
                    {errors.password && <span className="error bg-slate-200 text-black px-4">Senha é obrigatória</span>}
                </div>
                {error && <span className="error">{error}</span>}
                <div className="flex justify-center my-2">
                    <button type="submit">Entrar</button>
                </div>
                <span>
                    Ainda não possui cadastro?{" "}
                    <strong>
                        <Link to="/cadastro">CADASTRE-SE</Link>
                    </strong>
                </span>
            </form>
        </div>
    )
}