import axios from 'axios';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const DataContext = createContext();

const ContextAPI = (props) => {
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    //login and singup
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        wallet: '',
    });
    const [authToken, setAuthToken] = useState({
        authToken: null,
        isAuthenticated: false,
        role: null,
    });

    const handleLoggedIn = (data) => {
        localStorage.setItem('x-auth-token', data.token);
        setAuthToken({
            authToken: data.token,
            isAuthenticated: true,
            role: data.user.role,
        });
        setUserData({
            name: data.user.name,
            email: data.user.email,
            wallet: data.user.walletAddress,
        });
        navigate('/');
    };
    const handleLoggedOut = () => {
        localStorage.removeItem('x-auth-token');
        setAuthToken({
            authToken: null,
            isAuthenticated: false,
            role: null,
        });
        navigate('/login');
    };

    const getProfile = async (auth) => {
        await axios
            .get(`${import.meta.env.VITE_BASE_URL}users/get-profile`, {
                headers: {
                    'x-auth-token': auth,
                },
            })
            .then((res) => {
                setUserData({
                    name: res.data.user.name,
                    email: res.data.user.email,
                    wallet: res.data.user.walletAddress,
                });
            });
    };

    const getAuthToken = useCallback(async (auth) => {
        await axios
            .get(`${import.meta.env.VITE_BASE_URL}users/verify-token`, {
                headers: {
                    'x-auth-token': auth,
                },
            })
            .then((res) => {
                setAuthToken({
                    authToken: auth,
                    isAuthenticated: true,
                    role: res.data.role,
                });
                navigate('/');
            })
            .catch(() => {
                localStorage.removeItem('x-auth-token');
                setAuthToken({
                    authToken: null,
                    isAuthenticated: false,
                    role: null,
                });
                navigate('/login');
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        let auth = localStorage.getItem('x-auth-token');

        if (auth) {
            getAuthToken(auth);
            getProfile(auth);
        }
    }, [getAuthToken]);

    return (
        <DataContext.Provider
            value={{
                loader,
                setLoader,
                authToken,
                handleLoggedOut,
                handleLoggedIn,
                userData,
            }}
        >
            {props.children}
        </DataContext.Provider>
    );
};

export default ContextAPI;
