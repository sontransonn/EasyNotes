import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import {
    getDownloadURL,
    getStorage, ref, uploadBytesResumable,
} from 'firebase/storage';
import toast from "react-hot-toast"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import {
    updateSuccess,
    deleteUserSuccess,
    signoutSuccess,
} from "../../../redux/slices/userSlice"

import { HiOutlineExclamationCircle } from 'react-icons/hi';

import { update_user_by_userId, delete_user_by_userId } from '../../../apis/user.api';
import { logout } from "../../../apis/auth.api"

import app from "../../../firebase"

const ProfileTab = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.user);

    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({});

    const filePickerRef = useRef();

    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    };

    // Upload image lên firebase
    const uploadImage = async () => {
        setImageFileUploading(true);
        setImageFileUploadError(null);

        const storage = getStorage(app);

        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                setImageFileUploadProgress(progress.toFixed(0));
            },
            (error) => {
                setImageFileUploadError(
                    'Could not upload image (File must be less than 2MB)'
                );
                setImageFileUploadProgress(null);
                setImageFile(null);
                setImageFileUrl(null);
                setImageFileUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                    setFormData({ ...formData, profilePicture: downloadURL });
                    setImageFileUploading(false);
                });
            }
        );
    };

    // Cập nhật thông tin user
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.keys(formData).length === 0) {
            toast.error('There are no changes to update yet!');
            return;
        }

        if (imageFileUploading) {
            toast.error('Please wait for photo update!');
            return;
        }

        try {
            setLoading(true)
            const response = await update_user_by_userId(formData, currentUser._id)

            setLoading(false)
            dispatch(updateSuccess(response.data));
            toast.success("User updated successfully!");
        } catch (error) {
            console.log(error);
            setLoading(false)
            toast.error(error.response.data.message)
        }
    };

    // Xóa tài khoản
    const handleDeleteUser = async () => {
        setShowModal(false);
        try {
            const response = await delete_user_by_userId(currentUser._id)

            dispatch(deleteUserSuccess(response.data));
            toast.success("Account deleted successfully!")
            navigate('/login')
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    };

    // Đăng xuất
    const handleSignout = async () => {
        if (window.confirm("You want to log out!")) {
            try {
                const response = await logout()

                toast.success("Logout successful!")
                dispatch(signoutSuccess());
                navigate("/login")
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message)
            }
        }
    };

    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile ({currentUser && currentUser.isAdmin ? "Admin" : "User"})</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                    ref={filePickerRef}
                    hidden
                />
                <div
                    className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
                    onClick={() => filePickerRef.current.click()}
                >
                    {imageFileUploadProgress && (
                        <CircularProgressbar
                            value={imageFileUploadProgress || 0}
                            text={`${imageFileUploadProgress}%`}
                            strokeWidth={5}
                            styles={{
                                root: {
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                },
                                path: {
                                    stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100
                                        })`,
                                },
                            }}
                        />
                    )}
                    <img
                        src={imageFileUrl || currentUser.profilePicture}
                        alt='user'
                        className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileUploadProgress &&
                            imageFileUploadProgress < 100 &&
                            'opacity-60'
                            }`}
                    />
                </div>
                {imageFileUploadError && (
                    <Alert color='failure'>{imageFileUploadError}</Alert>
                )}
                <TextInput
                    type='text'
                    id='username'
                    placeholder='username'
                    defaultValue={currentUser.username}
                    onChange={handleChange}
                />
                <TextInput
                    type='email'
                    id='email'
                    placeholder='email'
                    defaultValue={currentUser.email}
                    onChange={handleChange}
                />
                <TextInput
                    type='password'
                    id='password'
                    placeholder='password'
                    onChange={handleChange}
                />
                <Button
                    type='submit'
                    gradientDuoTone='purpleToBlue'
                    outline
                    disabled={loading || imageFileUploading}
                >
                    {loading ? 'Loading...' : 'Update'}
                </Button>
                {currentUser.isAdmin && (
                    <Link to={'/create-post'}>
                        <Button
                            type='button'
                            gradientDuoTone='purpleToPink'
                            className='w-full'
                        >
                            Create a new post
                        </Button>
                    </Link>
                )}
            </form>
            <div className='text-red-500 flex justify-between mt-5'>
                <span onClick={() => setShowModal(true)} className='cursor-pointer'>
                    Delete account
                </span>
                <span onClick={handleSignout} className='cursor-pointer'>
                    Logout
                </span>
            </div>

            {/* Modal */}
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size='md'
            >
                <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                            Are you sure you want to delete this account?
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button color='failure' onClick={handleDeleteUser}>
                                Yes, I'm sure
                            </Button>
                            <Button color='gray' onClick={() => setShowModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ProfileTab