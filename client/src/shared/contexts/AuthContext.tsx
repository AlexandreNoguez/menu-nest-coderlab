import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/axios-config';
import { toast } from 'react-toastify';
import { IUser } from '../types/IUser';

interface IAuthContextType {
    user: IUser | null;
    login: (username: string, password: string) => void;
    logout: () => void;
    authenticated: boolean;
    loading: boolean;
}

interface IChildren {
    children: ReactNode
}

const AuthContext = createContext<IAuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: IChildren) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<IUser | null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [loading, setLoading] = useState<boolean>(true);



    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            api.defaults.headers.Authorization = `Bearer ${storedToken}`;
        }
        setLoading(false)
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await api.post("/auth/login", { email, password })

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
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);

        navigate('/auth/login')
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, authenticated: !!user, loading }}>
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
