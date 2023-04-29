import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import logo from '../../assets/logos/LI-Logo.png'
import { removeUser } from '../../store/slices/userSlice'
import './header.css'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../button/Button'

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [text, setText] = useState('Login')

    const pathName = location.pathname;

    useEffect(() => {
        if (pathName === '/login') {
            setText('Sign Up')
        } else if (pathName === '/signup') {
            setText('Login')
        } else {
            setText('Logout')
        }
    }, [pathName])

    const onClick = () => {
        if (pathName === '/login') {
            navigate('/signup')
        } else if (pathName === '/signup') {
            navigate('/login')
        }
        else {
            dispatch(removeUser());
            navigate('/login')
        }
    };

    return (
        <header className='header'>
            <img src={logo} alt='Logo' style={{ objectFit: 'contain', width: '16rem' }} />
            <Button text={text} onClick={onClick} size={'large'} />
        </header>
    )
}

export default Header