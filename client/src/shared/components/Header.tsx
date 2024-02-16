import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom";

export const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header className="flex items-center justify-between px-8 bg-slate-800 h-20 gap-4">
            <div className="text-center">
                <Link className="text-slate-200" to={"/"}>
                <h1 className="text-xl">Cardápio Online</h1>
                <p>Escolha sua comida favorita e solicite já!</p>
                </Link>
            </div>

            <div className="flex items-center gap-4">
                {
                    user ?
                        <span>Olá <strong className="user-name">{user?.name}</strong>!</span>
                        : null
                }
                {
                    !user ?
                        <Link className="text-white" to={"/auth/login"}>
                            <button className="bg-slate-600">
                                Entrar
                            </button>
                        </Link>

                        : <button className="bg-slate-600" onClick={logout}>
                            Sair
                        </button>
                }
                {
                    user?.role == "admin" ?
                        <Link className="text-white" to={"/admin"}>
                            <button className="bg-slate-600">
                                Gerenciar Produtos
                            </button>
                        </Link>
                        : null
                }

            </div>
        </header>
    )
}