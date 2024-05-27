import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Spin } from 'antd';
import '../styles/AdminRoute.css';

const AdminRoute = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const { data } = await axios.get('https://andonesolar.onrender.com/api/auth/profile', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser(data);
                } catch (error) {
                    console.error(error);
                    localStorage.removeItem('token');
                    setUser(null);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    if (loading) {
        return (
            <div className="spinner-container">
                <Spin size="large" />
            </div>
        );
    }

    return user && user.role === 'admin' ? <Outlet /> : <Navigate to="/pagenotfound" replace />;
};

export default AdminRoute;
