import React, { useContext, useState } from 'react';
import { Box, InputBase, Button, Container, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { DataContext } from '../utils/ContextAPI';

function Login() {
    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const [inputType, setInputType] = useState('password');
    const { handleLoggedIn } = useContext(DataContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email && password) {
            await axios
                .post(`${import.meta.env.VITE_BASE_URL}users/login`, {
                    email,
                    password,
                })
                .then((res) => {
                    toast.success(res.data.message);
                    handleLoggedIn(res.data);
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                });
        } else {
            toast.error('Fill all Fields');
        }
    };
    return (
        <Container maxWidth={'sm'}>
            <Box
                sx={{
                    mt: 10,
                    mb: 2,
                    fontSize: '28px ',
                    fontWeight: 700,
                    textAlign: 'center',
                }}
            >
                Login
            </Box>

            <Box sx={{ width: '100%', mx: 'auto' }}>
                <InputBase
                    placeholder="Enter Email"
                    sx={{
                        px: 2,
                        py: 1,
                        my: 2,
                        width: '100%',
                        fontSize: '18px',
                        border: '1px solid #000',
                        borderRadius: '5px',
                    }}
                    onChange={(e) => setemail(e.target.value)}
                />
                <Box
                    sx={{
                        px: 2,
                        py: 1,
                        mb: 2,
                        width: '100%',
                        border: '1px solid #000',
                        borderRadius: '5px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <InputBase
                        placeholder="Enter Password"
                        type={inputType}
                        sx={{
                            width: '100%',
                            fontSize: '18px',
                        }}
                        onChange={(e) => setpassword(e.target.value)}
                    />
                    <IconButton
                        onClick={() => {
                            setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
                        }}
                    >
                        {inputType === 'text' ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </Box>

                <Button
                    variant="contained"
                    sx={{
                        my: 2,
                        width: '100%',
                        py: 1,
                    }}
                    onClick={(e) => {
                        handleSubmit(e);
                    }}
                >
                    Login
                </Button>
            </Box>
        </Container>
    );
}

export default Login;
