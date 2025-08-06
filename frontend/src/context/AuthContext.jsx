/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => { 
        try {
            const res = await api.get('/auth/current');
            setUser(res.data.user);
        } catch (error) {
            console.error('Failed to fetch user:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const login = async (formData) => {
        await api.post('/auth/login', formData);
        await fetchUser();
    };

    const register = async (formData) => {
        await api.post('/auth/register', formData);
        await fetchUser();
    };

    const logout = async () => {
        await api.post('/auth/logout');
        setUser(null);
    };

    const updateProfile = async (formData) => {
        const res = await api.put('/auth/update', formData);
        setUser(res.data.user);
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
