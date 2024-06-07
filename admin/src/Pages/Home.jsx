import { Container, Typography } from '@mui/material';
import React from 'react';

const Home = () => {
    return (
        <Container maxWidth="sm">
            <Typography
                sx={{
                    textAlign: 'center',
                    fontSize: '28px',
                    fontWeight: '600',
                    my: 5,
                }}
            >
                Welcome to ABC PTY LTD Dashboard
            </Typography>
        </Container>
    );
};

export default Home;
