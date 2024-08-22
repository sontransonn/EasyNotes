import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Label, Spinner, TextInput } from 'flowbite-react';
import toast from 'react-hot-toast';

import { signInSuccess } from "../../redux/slices/userSlice"

import OAuth from '../../components/OAuth';

import { login_user } from '../../apis/auth.api';

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.user)

    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (currentUser) {
            navigate("/")
        }
    }, [])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value.trim()
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast.error('Vui lòng điền đầy đủ thông tin!');
            return
        }

        try {
            setLoading(true)
            const response = await login_user(formData)
            const data = response.data

            setLoading(false)
            dispatch(signInSuccess(data));
            toast.success("Đăng nhập thành công!");
            navigate('/');
        } catch (error) {
            setLoading(false)
            toast.error(error.response.data.message)
        }
    };

    return (
        <div className='min-h-screen mt-20'>
            <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
                <div className='flex-1'>
                    <Link to='/' className='font-bold dark:text-white text-4xl'>
                        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                            WordWave
                        </span>
                        Blog
                    </Link>
                    <p className='text-sm mt-5'>
                        Đây là một dự án demo.
                        Bạn có thể đăng nhập bằng email và mật khẩu của mình hoặc bằng Google.
                    </p>
                </div>

                <div className='flex-1'>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div>
                            <Label value='Email:' />
                            <TextInput
                                type='email'
                                placeholder='name@gmail.com'
                                id='email'
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label value='Mật khẩu:' />
                            <TextInput
                                type='password'
                                placeholder='**********'
                                id='password'
                                onChange={handleChange}
                            />
                        </div>
                        <Button
                            gradientDuoTone='purpleToPink'
                            type='submit'
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Spinner size='sm' />
                                    <span className='pl-3'>Đang tải....</span>
                                </>
                            ) : (
                                'Đăng nhập'
                            )}
                        </Button>
                        <OAuth />
                    </form>
                    <div className='flex gap-2 text-sm mt-5'>
                        <span>Bạn chưa có tài khoản?</span>
                        <Link to='/register' className='text-blue-500 hover:underline'>
                            Đăng ký ngay!
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage