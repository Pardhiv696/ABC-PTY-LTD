import React, { useContext, useState } from 'react';
import { Box, IconButton, InputBase, Button, Container, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { DataContext } from '@/utils/ContextAPI';

function SignUp() {
    const [user, setuser] = useState({
        profilePic: '',
        name: '',
        email: '',
        password: '',
        intro: '',
        facebook: '',
        twitter: '',
        instagram: '',
        pinterest: '',
    });
    const [inputType, setInputType] = useState('password');
    const { setLoader } = useContext(DataContext);

    const onSubmit = async () => {
        const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
        const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');

        if (!validEmail.test(user.email)) {
            toast.error('Email is not valid');
        } else if (!validPassword.test(user.password)) {
            toast.error('Password is not valid');
        } else if (!user.name) {
            toast.error('Enter Name');
        } else if (!user.intro) {
            toast.error('Enter Introduction');
        } else if (!user.profilePic) {
            toast.error('Upload Profile Picture');
        } else {
            setLoader(true);
            await axios
                .post(`${import.meta.env.VITE_BASE_URL}users/signup`, user)
                .then(async (res) => {
                    toast.success(res.data.message);

                    setuser({
                        name: '',
                        email: '',
                        password: '',
                        intro: '',
                        profilePic: '',
                    });
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                });

            setLoader(false);
        }
    };

    const uploadProfilePic = async (file) => {
        setLoader(true);
        const formData = new FormData();
        formData.append('image', file);

        await axios
            .post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_PROJECT_ID}`, formData)
            .then((result) => setuser({ ...user, profilePic: result.data.data.url }))
            .catch(() => toast.error('Upload Failed'));

        setLoader(false);
    };

    return (
        <Container maxWidth={'sm'}>
            <Typography
                sx={{
                    textAlign: 'center',
                    fontSize: '32px',
                    mt: 5,
                }}
            >
                Register a New User
            </Typography>

            <Box sx={{ width: '100%', mx: 'auto', my: 3 }}>
                <InputBase
                    placeholder="Enter Name"
                    onChange={(e) => setuser({ ...user, name: e.target.value })}
                    value={user.name}
                    sx={{
                        px: 2,
                        py: 1,
                        my: 2,
                        width: '100%',
                        fontSize: '18px',
                        border: '1px solid #000',
                        borderRadius: '5px',
                    }}
                />
                <InputBase
                    placeholder="Enter Email"
                    onChange={(e) => setuser({ ...user, email: e.target.value })}
                    value={user.email}
                    sx={{
                        px: 2,
                        py: 1,
                        my: 2,
                        width: '100%',
                        fontSize: '18px',
                        border: '1px solid #000',
                        borderRadius: '5px',
                    }}
                />

                <Box
                    sx={{
                        px: 2,
                        py: 1,
                        my: 2,
                        width: '100%',
                        border: '1px solid #000',
                        borderRadius: '5px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <InputBase
                        placeholder="Set Password "
                        onChange={(e) => setuser({ ...user, password: e.target.value })}
                        value={user.password}
                        type={inputType}
                        sx={{
                            width: '100%',
                            fontSize: '18px',
                        }}
                    />
                    <IconButton
                        onClick={() => {
                            setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
                        }}
                    >
                        {inputType === 'text' ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </Box>
                <InputBase
                    placeholder="Upload Pic"
                    type="file"
                    inputProps={{ accept: 'image/png, image/jpeg' }}
                    onChange={(e) => uploadProfilePic(e.target.files[0])}
                    sx={{
                        px: 2,
                        py: 1,
                        my: 2,
                        width: '100%',
                        fontSize: '18px',
                        border: '1px solid #000',
                        borderRadius: '5px',
                    }}
                />
                <InputBase
                    placeholder="Enter facebook link"
                    onChange={(e) => setuser({ ...user, facebook: e.target.value })}
                    value={user.facebook}
                    sx={{
                        px: 2,
                        py: 1,
                        my: 2,
                        width: '100%',
                        fontSize: '18px',
                        border: '1px solid #000',
                        borderRadius: '5px',
                    }}
                />
                <InputBase
                    placeholder="Enter instagram link"
                    onChange={(e) => setuser({ ...user, instagram: e.target.value })}
                    value={user.instagram}
                    sx={{
                        px: 2,
                        py: 1,
                        my: 2,
                        width: '100%',
                        fontSize: '18px',
                        border: '1px solid #000',
                        borderRadius: '5px',
                    }}
                />
                <InputBase
                    placeholder="Enter twitter link"
                    onChange={(e) => setuser({ ...user, twitter: e.target.value })}
                    value={user.twitter}
                    sx={{
                        px: 2,
                        py: 1,
                        my: 2,
                        width: '100%',
                        fontSize: '18px',
                        border: '1px solid #000',
                        borderRadius: '5px',
                    }}
                />
                <InputBase
                    placeholder="Enter pinterest link"
                    onChange={(e) => setuser({ ...user, pinterest: e.target.value })}
                    value={user.pinterest}
                    sx={{
                        px: 2,
                        py: 1,
                        my: 2,
                        width: '100%',
                        fontSize: '18px',
                        border: '1px solid #000',
                        borderRadius: '5px',
                    }}
                />
                <InputBase
                    placeholder="Enter Introduction"
                    onChange={(e) => setuser({ ...user, intro: e.target.value })}
                    value={user.intro}
                    multiline={true}
                    sx={{
                        px: 2,
                        py: 1,
                        my: 2,
                        width: '100%',
                        fontSize: '18px',
                        border: '1px solid #000',
                        borderRadius: '5px',
                    }}
                />
                <Button
                    variant="contained"
                    sx={{ width: '100%', py: 1, mt: 2 }}
                    onClick={() => onSubmit()}
                >
                    Sign Up
                </Button>
            </Box>
        </Container>
    );
}

export default SignUp;
