import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    let initialToken = JSON.parse(localStorage.getItem("token")) || null; 
    let [token, setToken] = useState(initialToken);

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", JSON.stringify(token));
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    const logout = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, setToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};