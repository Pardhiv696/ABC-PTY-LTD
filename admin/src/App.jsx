import React, { useContext, useMemo } from 'react';
import { responsiveFontSizes } from '@mui/material/styles';
import { ThemeProvider, Backdrop, useTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Grid } from 'react-loader-spinner';

import { DataContext } from './utils/ContextAPI';
import { createCustomTheme } from './utils/createCustomTheme';
import Home from './Pages/Home';
import { useAppSelector } from './utils/store/hooks';
import { Route, Routes } from 'react-router-dom';
import Admin from './Pages/Admin/Index';
import IndexMain from './Pages/IndexMain';
import SignUp from './Pages/Admin/Signup';
import Login from './Pages/Login';
import UserManagement from './Pages/Admin/UserManagement';
import Journalist from './Pages/Journalist/Index';
import CreateBlog from './Pages/Journalist/CreateBlog';
import './App.css';
import EditBlog from './Pages/Journalist/EditBlog';
import BlogManagement from './Pages/Admin/BlogManagement';
import BlogManagementAuthor from './Pages/Journalist/BlogManagement';

const App = () => {
    const { loader } = useContext(DataContext);
    const mode = useAppSelector((state) => state.theme.mode);

    const theme = useTheme();

    const themeClient = useMemo(() => {
        let theme = createCustomTheme(mode);
        theme = responsiveFontSizes(theme);
        return theme;
    }, [mode]);

    return (
        <>
            <ThemeProvider theme={themeClient}>
                <CssBaseline enableColorScheme />
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    limit={3}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme={mode}
                />

                <Backdrop
                    sx={{
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={loader}
                >
                    <Grid
                        visible={true}
                        height="80"
                        width="80"
                        color={`${theme.palette.mode === 'dark' ? '#000' : '#fff'}`}
                        ariaLabel="grid-loading"
                        radius="12.5"
                        wrapperStyle={{}}
                        wrapperClass="grid-wrapper"
                    />
                </Backdrop>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<IndexMain />}>
                        <Route path="" element={<Home />} />
                    </Route>
                    <Route path="/admin" element={<Admin />}>
                        <Route path="" element={<SignUp />} />
                        <Route path="user-management" element={<UserManagement />} />
                        <Route path="blog-management" element={<BlogManagement />} />
                    </Route>
                    <Route path="/journalist" element={<Journalist />}>
                        <Route path="create-blog" element={<CreateBlog />} />
                        <Route path="blog-management" element={<BlogManagementAuthor />} />
                        <Route path="blog-edit/:blogId" element={<EditBlog />} />
                    </Route>
                </Routes>
            </ThemeProvider>
        </>
    );
};

export default App;
