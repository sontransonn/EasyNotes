import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';

import app from '../firebase';

import { signInSuccess } from "../redux/slices/userSlice"

import { AiFillGoogleCircle } from 'react-icons/ai';

import { google } from '../apis/auth.api';


const OAuth = () => {
    const auth = getAuth(app)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account' })
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider)

            const response = await google({
                name: resultsFromGoogle.user.displayName,
                email: resultsFromGoogle.user.email,
                googlePhotoUrl: resultsFromGoogle.user.photoURL
            })

            dispatch(signInSuccess(response.data))
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
            <AiFillGoogleCircle className='w-6 h-6 mr-2' />
            Continue with Google
        </Button>
    )
}

export default OAuth