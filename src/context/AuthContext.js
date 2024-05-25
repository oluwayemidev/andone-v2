import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const { data } = await axios.get('http://localhost:5000/api/auth/profile', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser(data);
                } catch (error) {
                    console.error(error);
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
        };
        fetchUser();
    }, []);

    const login = async (emailOrPhone, password) => {
        const { data } = await axios.post('http://localhost:5000/api/auth/login', { emailOrPhone, password });
        localStorage.setItem('token', data.token);
        setUser(data.user);
    };

    const register = async (name, email, phoneNumber, password) => {
        const { data } = await axios.post('http://localhost:5000/api/auth/register', { name, email, phoneNumber, password });
        localStorage.setItem('token', data.token);
        setUser(data.user);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
