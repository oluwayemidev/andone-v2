import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import { auth } from '../pages/firebase'; // Ensure correct import path
import '../styles/AdminRoute.css';

const AdminRoute = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    if (parsedUser && parsedUser.uid) {
                        const currentUser = auth.currentUser;
                        if (currentUser && currentUser.uid === parsedUser.uid) {
                            setUser(parsedUser);
                            setLoading(false);
                        } else {
                            // Refresh user state from Firebase
                            auth.onAuthStateChanged((firebaseUser) => {
                                if (firebaseUser) {
                                    setUser(firebaseUser);
                                    localStorage.setItem('user', JSON.stringify(firebaseUser));
                                } else {
                                    setUser(null);
                                    localStorage.removeItem('user');
                                }
                                setLoading(false);
                            });
                        }
                    } else {
                        setUser(null);
                        localStorage.removeItem('user');
                        setLoading(false);
                    }
                } catch (error) {
                    console.error("Error parsing user from local storage:", error);
                    setUser(null);
                    localStorage.removeItem('user');
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

    return user && user.email === 'admin@andonesolar.com' ? <Outlet /> : <Navigate to="/pagenotfound" replace />;
};

export default AdminRoute;
