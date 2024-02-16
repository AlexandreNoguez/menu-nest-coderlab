import { useAuth } from "../contexts/AuthContext"

export const Header = () => {
    const { user, logout } = useAuth();
    console.log(user);

    return (
        <header className="flex items-center justify-between px-8 bg-slate-800 h-20 gap-4">
            <div className="text-center">
                <h1 className="text-xl">Cardápio Online</h1>
                <p>Escolha sua comida favorita e solicite já!</p>
            </div>

            <div className="flex items-center gap-4">
                <span>Olá! <strong className="user-name">{user?.name}</strong>!</span>
                <button className="bg-slate-600" type="submit" onClick={logout}>
                    Sair
                </button>
            </div>
        </header>
    )
}