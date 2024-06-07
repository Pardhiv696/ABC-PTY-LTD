import { Box, Button, Container, InputBase, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import ImageUploader from 'quill-image-uploader';

import 'quill-image-uploader/dist/quill.imageUploader.min.css';
import { DataContext } from '@/utils/ContextAPI';
import { useNavigate, useParams } from 'react-router-dom';

Quill.register('modules/imageUploader', ImageUploader);

const modules = {
    toolbar: {
        container: [
            [{ font: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ color: [] }, { background: [] }],
            [{ script: 'sub' }, { script: 'super' }],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
            ['link', 'image'],
            ['clean'],
        ],
    },
    imageUploader: {
        upload: (file) => {
            return new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append('image', file);

                fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_PROJECT_ID}`, {
                    method: 'POST',
                    body: formData,
                })
                    .then((response) => response.json())
                    .then((result) => {
                        console.log(result);
                        resolve(result.data.url);
                    })
                    .catch((error) => {
                        reject('Upload failed');
                        console.error('Error:', error);
                    });
            });
        },
    },
};

const CreateBlog = () => {
    const [value, setValue] = useState('');
    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const { authToken, setLoader } = useContext(DataContext);
    const params = useParams();
    const navigate = useNavigate();
    const uploadThumbnail = async (file) => {
        setLoader(true);
        const formData = new FormData();
        formData.append('image', file);

        await axios
            .post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_PROJECT_ID}`, formData)
            .then((result) => setThumbnail(result.data.data.url))
            .catch(() => toast.error('Upload Failed'));

        setLoader(false);
    };

    const postBlogs = async () => {
        if (!value || !title || !thumbnail) {
            toast.error('Please Fill all Fields');
            return false;
        }
        setLoader(true);
        await axios
            .post(
                `${import.meta.env.VITE_BASE_URL}blogs/update`,
                { blog: value, title, thumbnail, id: params.blogId },
                {
                    headers: {
                        'x-auth-token': authToken.authToken,
                    },
                },
            )
            .then((res) => {
                toast.success(res.data.message);
                document.querySelector('.ql-editor').innerHTML = null;
                setTitle('');
                setThumbnail('');
                navigate('/journalist/blog-management');
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
        setLoader(false);
    };
    const fetchSingleBlog = async () => {
        setTimeout(async () => {
            await axios
                .get(`${import.meta.env.VITE_BASE_URL}blogs/getSingle/${params.blogId}`)
                .then((response) => {
                    setValue(response.data.blog.content);
                    setTitle(response.data.blog.title);
                    setThumbnail(response.data.blog.thumbnail);
                });
        }, 500);
    };
    useEffect(() => {
        fetchSingleBlog();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
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
                Write Your Blog
            </Typography>
            <Box
                sx={{
                    my: 5,
                    p: 2,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'wheat',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    borderRadius: '10px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 0.5,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '18px',
                                fontWeight: '500',
                                color: 'black',
                            }}
                        >
                            Enter Tittle
                        </Typography>
                        <InputBase
                            sx={{
                                py: 0.5,
                                px: 1,
                                width: '100%',
                                maxWidth: '500px',
                                borderRadius: '5px',
                                color: 'black',
                                border: '1px solid #000',
                            }}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 0.5,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '18px',
                                fontWeight: '500',
                                color: 'black',
                            }}
                        >
                            Upload Thumbnail
                        </Typography>
                        <InputBase
                            sx={{
                                py: 0.5,
                                px: 1,
                                width: '100%',
                                maxWidth: '500px',
                                borderRadius: '5px',
                                color: 'black',
                                border: '1px solid #000',
                            }}
                            type="file"
                            inputProps={{ accept: 'image/png, image/jpeg' }}
                            onChange={(e) => uploadThumbnail(e.target.files[0])}
                            placeholder="Thumbnail"
                        />
                    </Box>
                </Box>

                <ReactQuill
                    modules={modules}
                    theme="snow"
                    onChange={setValue}
                    value={value}
                    placeholder="Content goes here..."
                    height="1000px"
                    style={{
                        borderColor: 'red',
                    }}
                />

                <Box
                    sx={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'end',
                        gap: '10px',
                    }}
                >
                    <Button
                        sx={{
                            color: 'white',
                            backgroundColor: 'red',
                            border: '1px solid red',
                            px: 3,
                            '&:hover': {
                                color: 'red',
                                border: '1px solid red',
                            },
                        }}
                        onClick={() => (document.querySelector('.ql-editor').innerHTML = null)}
                    >
                        Clear
                    </Button>
                    <Button
                        sx={{
                            color: 'white',
                            backgroundColor: 'green',
                            border: '1px solid green',
                            px: 3,
                            '&:hover': {
                                color: 'green',
                                border: '1px solid green',
                            },
                        }}
                        onClick={postBlogs}
                    >
                        Post
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default CreateBlog;
