import { createContext, useState, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/axios-config';
import { toast } from 'react-toastify';

interface IAuthContextType {
    user: string | null;
    login: (username: string, password: string) => void;
    logout: () => void;
}

interface IChildren {
    children: ReactNode
}

const AuthContext = createContext<IAuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: IChildren) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<string | null>(null);

    const login = async (email: string, password: string) => {
        try {
            const response = await api.post("/auth/login", { email, password })

            console.log("response.data", response);
            const { user, token } = response.data;

            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", JSON.stringify(token));

            api.defaults.headers.Authorization = `Bearer ${String}`;
            setUser(user);
            navigate("/");

        } catch (error) {
            console.log(error)
            return toast.error("Usuário ou senha inválido.")
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthContextProvider');
    }
    return context;
};
