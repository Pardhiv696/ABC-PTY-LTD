import Header from '@/Components/Header';
import { DataContext } from '@/utils/ContextAPI';
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Admin() {
    const { authToken } = useContext(DataContext);
    if (authToken.role !== 'admin') {
        toast.error('You are not authorized!');
        return <Navigate to="/" />;
    }

    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}
