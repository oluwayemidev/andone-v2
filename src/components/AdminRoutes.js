import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AdminRoute = () => {
    const { user } = useAuth();

    if (user === null) {
        // You might want to show a loading indicator while fetching the user
        return <div>Loading...</div>;
    }

    return user && user.role === 'admin' ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminRoute;
