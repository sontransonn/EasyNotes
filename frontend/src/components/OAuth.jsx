import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'flowbite-react';
import toast from "react-hot-toast"
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';

import { signInSuccess } from "../redux/slices/userSlice"

import { AiFillGoogleCircle } from 'react-icons/ai';

import { login_with_google } from '../apis/auth.api';

import app from '../firebase';

const OAuth = () => {
    const auth = getAuth(app)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account' })
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider)

            const response = await login_with_google({
                name: resultsFromGoogle.user.displayName,
                email: resultsFromGoogle.user.email,
                googlePhotoUrl: resultsFromGoogle.user.photoURL
            })

            dispatch(signInSuccess(response.data))
            toast.success("Đăng nhập thành công!")
            navigate('/')
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }

    return (
        <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
            <AiFillGoogleCircle className='w-6 h-6 mr-2' />
            Tiếp tục với Google
        </Button>
    )
}

export default OAuth