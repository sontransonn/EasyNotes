import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import { CircularProgressbar } from 'react-circular-progressbar';
import {
    getDownloadURL,
    getStorage, ref, uploadBytesResumable,
} from 'firebase/storage';
import toast from 'react-hot-toast';
import 'react-quill/dist/quill.snow.css';
import 'react-circular-progressbar/dist/styles.css';

import { get_post_by_postId, update_post } from '../../apis/post.api';

import app from "../../firebase"

const UpdatePostPage = () => {
    const { postId } = useParams();
    const navigate = useNavigate();

    const { currentUser } = useSelector((state) => state.user);

    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        try {
            const fetchPost = async () => {
                const response = await get_post_by_postId(postId)

                setFormData(response.data.post);
            };

            fetchPost();
        } catch (error) {
            console.log(error);
        }
    }, [postId]);

    const handleUpdloadImage = async () => {
        try {
            if (!file) {
                setImageUploadError('Please select an image');
                return;
            }
            setImageUploadError(null);

            const storage = getStorage(app);

            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, fileName);

            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    setImageUploadError('Image upload failed');
                    setImageUploadProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        setFormData({ ...formData, image: downloadURL });
                    });
                }
            );
        } catch (error) {
            setImageUploadError('Image upload failed');
            setImageUploadProgress(null);
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await update_post(formData, currentUser._id)

            toast.success("Post updated successfully!")
            navigate(`/post/${response.data.slug}`);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    };

    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>
            <h1 className='text-center text-3xl my-7 font-semibold'>Update post</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                    <TextInput
                        type='text'
                        placeholder='Title'
                        required
                        id='title'
                        className='flex-1'
                        onChange={(e) =>
                            setFormData(prevFormData => ({
                                ...prevFormData,
                                title: e.target.value,
                            }))
                        }
                        value={formData.title}
                    />
                    <Select
                        onChange={(e) =>
                            setFormData(prevFormData => ({
                                ...prevFormData,
                                category: e.target.value,
                            }))
                        }
                        value={formData.category}
                    >
                        <option value='uncategorized'>Select a category</option>
                        <option value='javascript'>JavaScript</option>
                        <option value='reactjs'>React.js</option>
                        <option value='nextjs'>Next.js</option>
                    </Select>
                </div>
                <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
                    <FileInput
                        type='file'
                        accept='image/*'
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <Button
                        type='button'
                        gradientDuoTone='purpleToBlue'
                        size='sm'
                        outline
                        onClick={handleUpdloadImage}
                        disabled={imageUploadProgress}
                    >
                        {imageUploadProgress ? (
                            <div className='w-16 h-16'>
                                <CircularProgressbar
                                    value={imageUploadProgress}
                                    text={`${imageUploadProgress || 0}%`}
                                />
                            </div>
                        ) : (
                            'Upload Image'
                        )}
                    </Button>
                </div>
                {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
                {formData.image && (
                    <img
                        src={formData.image}
                        alt='upload'
                        className='w-full h-72 object-cover'
                    />
                )}
                <ReactQuill
                    theme='snow'
                    value={formData.content}
                    placeholder='Write something...'
                    className='h-72 mb-12'
                    required
                    onChange={(value) => {
                        setFormData(prevFormData => ({
                            ...prevFormData,
                            content: value,
                        }))
                    }}
                />
                <Button type='submit' gradientDuoTone='purpleToPink'>
                    Update post
                </Button>
            </form>
        </div>
    )
}

export default UpdatePostPage