import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectRoute = () => {
    const { user } = useAuth();

    if (user === null) {
        // You might want to show a loading indicator while fetching the user
        return <div>Loading...</div>;
    }

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectRoute;
