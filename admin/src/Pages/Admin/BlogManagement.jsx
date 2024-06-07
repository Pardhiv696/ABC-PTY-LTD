import {
    Box,
    Button,
    Container,
    Dialog,
    InputBase,
    Pagination,
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

const BlogManagement = () => {
    const { setLoader, authToken } = useContext(DataContext);
    const [open, setOpen] = React.useState(false);
    const [records, setrecords] = useState([]);
    const [search, setsearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalpage, setTotalPage] = useState(0);
    const [showBlog, setshowBlog] = useState({ title: '', content: '' });

    const approvalHandle = async (id, decision) => {
        try {
            if (
                !window.confirm(
                    `Are you sure you want to ${decision === 'approved' ? 'approve' : 'reject'}?`,
                )
            )
                return;

            setLoader(true);

            await axios
                .post(
                    `${import.meta.env.VITE_BASE_URL}blogs/approval`,
                    {
                        id,
                        decision,
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

    const featureHandle = async (id, decision) => {
        try {
            if (
                !window.confirm(
                    `Are you sure you want to ${decision === 'featured' ? 'feature this blog' : 'remove this blog from feature'} ?`,
                )
            )
                return;

            setLoader(true);

            await axios
                .post(
                    `${import.meta.env.VITE_BASE_URL}blogs/feature-update`,
                    {
                        id,
                        decision,
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
                .get(`${import.meta.env.VITE_BASE_URL}blogs/get-all-by-admin`, {
                    params: {
                        page: page,
                        limit: 10,
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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getRecords();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    return (
        <Container>
            <Dialog fullWidth={true} maxWidth={'md'} open={open} onClose={handleClose}>
                <Typography
                    sx={{
                        textAlign: 'center',
                        fontSize: '28px',
                        fontWeight: '600',
                        mt: 5,
                    }}
                >
                    {showBlog.title}
                </Typography>
                <Box
                    p={2}
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div
                        style={{ width: '100%' }}
                        dangerouslySetInnerHTML={{ __html: showBlog.content }}
                    ></div>
                </Box>
            </Dialog>
            <Typography
                sx={{
                    textAlign: 'center',
                    fontSize: '32px',
                    mt: 5,
                    mb: 3,
                }}
            >
                Blogs Management
            </Typography>
            <Box
                sx={{
                    width: '100%',
                    my: 2,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        fontSize: '16px',
                    }}
                >
                    <Typography>Search By Title:</Typography>
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
                                <TableCell align="left">Title</TableCell>
                                <TableCell align="left">ID / Status</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {records &&
                                records?.map(
                                    ({ name, email, _id, title, approval, flag, content }, i) => (
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
                                            <TableCell align="left">
                                                {title.slice(0, 20)}...
                                            </TableCell>
                                            <TableCell align="left">
                                                <Stack direction={'column'}>
                                                    <Typography
                                                        sx={{
                                                            lineHeight: 1,
                                                        }}
                                                    >
                                                        {_id}
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            fontSize: '12px',
                                                            lineHeight: 1,
                                                        }}
                                                    >
                                                        {approval}
                                                    </Typography>
                                                </Stack>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Stack
                                                    direction="row"
                                                    spacing={2}
                                                    justifyContent="right"
                                                >
                                                    {flag === 'normal' ? (
                                                        <Button
                                                            color="secondary"
                                                            variant="outlined"
                                                            sx={{
                                                                fontSize: '14px',
                                                                color: '#fff',
                                                                textTransform: 'capitalize',
                                                                display:
                                                                    approval === 'approved'
                                                                        ? 'block'
                                                                        : 'none',
                                                            }}
                                                            onClick={() =>
                                                                featureHandle(_id, 'featured')
                                                            }
                                                        >
                                                            Not Featured
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
                                                                display:
                                                                    approval === 'approved'
                                                                        ? 'block'
                                                                        : 'none',
                                                            }}
                                                            onClick={() =>
                                                                featureHandle(_id, 'normal')
                                                            }
                                                        >
                                                            Featured
                                                        </Button>
                                                    )}

                                                    <Button
                                                        color="error"
                                                        variant="outlined"
                                                        sx={{
                                                            fontSize: '14px',
                                                            color: '#fff',
                                                            textTransform: 'capitalize',
                                                            background: 'green',
                                                            display:
                                                                approval !== 'pending'
                                                                    ? 'none'
                                                                    : 'block',
                                                        }}
                                                        onClick={() =>
                                                            approvalHandle(_id, 'approved')
                                                        }
                                                    >
                                                        Approve
                                                    </Button>
                                                    <Button
                                                        color="error"
                                                        variant="outlined"
                                                        sx={{
                                                            fontSize: '14px',
                                                            color: '#fff',
                                                            textTransform: 'capitalize',
                                                            background: 'red',
                                                            display:
                                                                approval !== 'pending'
                                                                    ? 'none'
                                                                    : 'block',
                                                        }}
                                                        onClick={() =>
                                                            approvalHandle(_id, 'rejected')
                                                        }
                                                    >
                                                        Reject
                                                    </Button>
                                                    <Button
                                                        color="error"
                                                        variant="outlined"
                                                        sx={{
                                                            fontSize: '14px',
                                                            color: '#fff',
                                                            textTransform: 'capitalize',
                                                            background: 'green',
                                                        }}
                                                        onClick={() => {
                                                            setshowBlog({
                                                                title,
                                                                content: content.replace(
                                                                    /<img /gim,
                                                                    // eslint-disable-next-line
                                                                    "<img width='100%'",
                                                                ),
                                                            });
                                                            handleClickOpen();
                                                        }}
                                                    >
                                                        View
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

export default BlogManagement;
