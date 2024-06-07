import {
    Box,
    Button,
    Container,
    InputBase,
    MenuItem,
    Pagination,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { DataContext } from '../../utils/ContextAPI';

const UserManagement = () => {
    const { setLoader, authToken } = useContext(DataContext);
    const [records, setrecords] = useState([]);
    const [search, setsearch] = useState('');
    const [role, setrole] = useState('all');
    const [page, setPage] = useState(1);
    const [totalpage, setTotalPage] = useState(0);

    const deleteRecord = async (email) => {
        try {
            if (!window.confirm('Are you sure you want to delete this account?')) return;
            setLoader(true);

            await axios
                .post(
                    `${import.meta.env.VITE_BASE_URL}users/deletebyAdmin`,
                    {
                        email,
                    },
                    {
                        headers: {
                            'x-auth-token': authToken.authToken,
                        },
                    },
                )
                .then((res) => {
                    toast.success(res.data.message);
                    getRecords();
                })
                .catch((err) => {
                    toast.error(err.response.data.message);
                });
            setLoader(false);
        } catch (error) {
            setLoader(false);
        }
    };
    const freezeAccount = async (email, status) => {
        try {
            if (
                !window.confirm(
                    `Are you sure you want to ${status ? 'freeze' : 'unfreeze'} this account?`,
                )
            )
                return;
            setLoader(true);

            await axios
                .post(
                    `${import.meta.env.VITE_BASE_URL}users/freezebyAdmin`,
                    {
                        email: email,
                        status: status,
                    },
                    {
                        headers: {
                            'x-auth-token': authToken.authToken,
                        },
                    },
                )
                .then((res) => {
                    toast.success(res.data.message);
                    getRecords();
                })
                .catch((err) => {
                    toast.error(err.response.data.message);
                });
            setLoader(false);
        } catch (error) {
            setLoader(false);
        }
    };

    const getRecords = async (search = '') => {
        try {
            setLoader(true);

            await axios
                .get(`${import.meta.env.VITE_BASE_URL}users/all-users`, {
                    params: {
                        page: page,
                        limit: 10,
                        role: role,
                        search: search,
                    },
                    headers: {
                        'x-auth-token': authToken.authToken,
                    },
                })
                .then((res) => {
                    setrecords(res.data.data);
                    setTotalPage(res?.data?.totalPage);
                });
            setLoader(false);
        } catch (error) {
            setLoader(false);
        }
    };
    useEffect(() => {
        getRecords();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, role]);

    return (
        <Container>
            <Typography
                sx={{
                    textAlign: 'center',
                    fontSize: '32px',
                    mt: 5,
                    mb: 3,
                }}
            >
                Account Management
            </Typography>
            <Box
                sx={{
                    width: '100%',
                    my: 2,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        fontSize: '16px',
                        width: '300px',
                    }}
                >
                    <Typography>Filter By Role:</Typography>
                    <Select
                        fullWidth
                        name="role"
                        value={role}
                        onChange={(e) => setrole(e.target.value)}
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="journalist">Journalist</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        fontSize: '16px',
                    }}
                >
                    <Typography>Search By Email:</Typography>
                    <Stack direction="row" gap={2}>
                        <InputBase
                            onChange={(e) => {
                                setsearch(e.target.value);
                            }}
                            value={search}
                            sx={{
                                fontSize: '16px',
                                borderRadius: '5px',
                                border: '2px solid #50505060',
                                p: 1,
                                width: '250px',
                            }}
                        />
                        <Button
                            sx={{
                                fontSize: '16px',
                                background: 'green',
                                color: '#ffffff',
                                px: 3,
                                borderRadius: '5px',
                            }}
                            onClick={() => getRecords(search)}
                        >
                            Search
                        </Button>
                        <Button
                            sx={{
                                fontSize: '16px',
                                border: '1px solid green',
                                color: '#ffffff',
                                px: 3,
                                borderRadius: '5px',
                            }}
                            onClick={() => {
                                setsearch('');
                                getRecords();
                            }}
                        >
                            Reset
                        </Button>
                    </Stack>
                </Box>
            </Box>
            <Box
                sx={{
                    mb: { xs: 5, md: 5 },
                    p: 0.5,
                    minWidth: '550px',
                    borderRadius: '5px',
                }}
            >
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Info</TableCell>
                                <TableCell align="left">Address</TableCell>
                                <TableCell align="left">Role</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {records &&
                                records?.map(
                                    ({ name, email, accountStatus, role, walletAddress }, i) => (
                                        <TableRow
                                            key={i}
                                            sx={{
                                                '&:last-child td, &:last-child th': {
                                                    border: 0,
                                                },
                                            }}
                                        >
                                            <TableCell align="left">
                                                <Stack direction={'column'}>
                                                    <Typography
                                                        sx={{
                                                            lineHeight: 1,
                                                        }}
                                                    >
                                                        {name}
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            fontSize: '12px',
                                                            lineHeight: 1,
                                                        }}
                                                    >
                                                        {email}
                                                    </Typography>
                                                </Stack>
                                            </TableCell>
                                            <TableCell align="left">{walletAddress}</TableCell>
                                            <TableCell align="left">{role}</TableCell>
                                            <TableCell align="right">
                                                <Stack
                                                    direction="row"
                                                    spacing={2}
                                                    justifyContent="right"
                                                >
                                                    {!accountStatus ? (
                                                        <Button
                                                            color="secondary"
                                                            variant="outlined"
                                                            sx={{
                                                                fontSize: '14px',
                                                                color: '#fff',
                                                                textTransform: 'capitalize',
                                                            }}
                                                            onClick={() =>
                                                                freezeAccount(email, true)
                                                            }
                                                        >
                                                            UnFreeze
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            color="secondary"
                                                            variant="outlined"
                                                            sx={{
                                                                fontSize: '14px',
                                                                color: '#fff',
                                                                textTransform: 'capitalize',
                                                                background: 'purple',
                                                            }}
                                                            onClick={() =>
                                                                freezeAccount(email, false)
                                                            }
                                                        >
                                                            Freeze
                                                        </Button>
                                                    )}

                                                    <Button
                                                        color="error"
                                                        variant="outlined"
                                                        sx={{
                                                            fontSize: '14px',
                                                            color: '#fff',
                                                            textTransform: 'capitalize',
                                                            background: 'red',
                                                        }}
                                                        onClick={() => deleteRecord(email)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    ),
                                )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {totalpage > 1 && (
                <Pagination
                    count={totalpage}
                    variant="outlined"
                    onChange={(e, page) => setPage(page)}
                    sx={{ mx: 'auto', justifyContent: 'center', display: 'flex', color: 'red' }}
                />
            )}
        </Container>
    );
};

export default UserManagement;
