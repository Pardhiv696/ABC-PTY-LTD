import React, { useContext, useState } from 'react';
import {
    Container,
    Hidden,
    Box,
    IconButton,
    Drawer,
    useTheme,
    Typography,
    Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { useAppDispatch, useAppSelector } from '@/utils/store/hooks';
import { changeTheme } from '@/utils/store/features/themeSlice';
import { Link } from 'react-router-dom';
import { DataContext } from '@/utils/ContextAPI';

const data = [
    {
        title: 'Register',
        link: '/admin',
        role: 'admin',
    },
    {
        title: 'Users',
        link: '/admin/user-management',
        role: 'admin',
    },
    {
        title: 'Blogs',
        link: '/admin/blog-management',
        role: 'admin',
    },
    {
        title: 'Blogs',
        link: '/journalist/blog-management',
        role: 'journalist',
    },
    {
        title: 'Create Blog',
        link: '/journalist/create-blog',
        role: 'journalist',
    },
];

const Header = () => {
    const dispatch = useAppDispatch();
    const mode = useAppSelector((state) => state.theme.mode);
    const { authToken, handleLoggedOut } = useContext(DataContext);

    const [state, setState] = useState(false);

    const theme = useTheme();

    const toggleDrawer = () => {
        setState((prev) => (prev === true ? false : true));
    };

    return (
        <>
            <Box bgcolor="background.paper">
                <Container>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        width="100%"
                        py={2}
                    >
                        <Link
                            to={'/'}
                            style={{
                                textDecoration: 'none',
                            }}
                        >
                            <Box
                                sx={{
                                    fontWeight: '600',
                                    fontSize: '1.25rem',
                                }}
                                color="text.primary"
                            >
                                ABC PTY LTD
                            </Box>
                        </Link>
                        <Hidden mdDown>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 2,
                                    alignItems: 'center',
                                }}
                            >
                                {data.map((item, index) => (
                                    <Link
                                        to={item.link}
                                        style={{
                                            textDecoration: 'none',
                                            display:
                                                item.role === authToken.role ? 'block' : 'none',
                                        }}
                                        key={index}
                                    >
                                        <Typography color="text.primary" fontWeight={500}>
                                            {item.title}
                                        </Typography>
                                    </Link>
                                ))}

                                <IconButton onClick={() => dispatch(changeTheme())}>
                                    {mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
                                </IconButton>
                                <Button variant="contained" onClick={() => handleLoggedOut()}>
                                    Logout
                                </Button>
                            </Box>
                        </Hidden>
                        <Hidden mdUp>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 2,
                                }}
                            >
                                <IconButton onClick={() => dispatch(changeTheme())}>
                                    {mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
                                </IconButton>

                                <IconButton onClick={() => toggleDrawer()}>
                                    <MenuIcon
                                        style={{
                                            fontSize: '28px',
                                        }}
                                    />
                                </IconButton>
                            </Box>
                            <Drawer anchor="right" open={state} onClose={() => toggleDrawer()}>
                                <Box
                                    sx={{
                                        background: `${theme.palette.background.medium}`,
                                        width: 300,
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: 5,
                                        pt: 8,
                                        px: 2,
                                    }}
                                    role="presentation"
                                >
                                    <Box display={'flex'} gap={2} alignItems={'center'}>
                                        <Box>Logo</Box>
                                    </Box>

                                    {data.map((item, index) => (
                                        <Link
                                            to={item.link}
                                            style={{
                                                textDecoration: 'none',
                                                display:
                                                    item.role === authToken.role ? 'block' : 'none',
                                            }}
                                            key={index}
                                        >
                                            <Typography color="text.primary" fontWeight={500}>
                                                {item.title}
                                            </Typography>
                                        </Link>
                                    ))}
                                    <Button variant="contained" onClick={() => handleLoggedOut()}>
                                        Logout
                                    </Button>
                                </Box>
                            </Drawer>
                        </Hidden>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default Header;
