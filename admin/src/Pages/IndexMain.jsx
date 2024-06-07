import Header from '@/Components/Header';
import { DataContext } from '@/utils/ContextAPI';
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function IndexMain() {
    const { authToken } = useContext(DataContext);
    if (authToken.role !== 'admin' && authToken.role !== 'journalist') {
        toast.error('You are not authorized!');
        return <Navigate to="/login" />;
    }

    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}
