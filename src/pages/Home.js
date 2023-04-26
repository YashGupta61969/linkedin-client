import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logos/LI-Logo.png'
import './home.css'
import avatar from '../assets/logos/user.png'
import { removeUser } from '../store/slices/userSlice'
import Aside from '../components/Aside'
import Main from '../components/Main'

function Home() {

  const dispatch = useDispatch()
  const {user} = useSelector(state => state.user)
  const navigate = useNavigate();

  const onLogout = () => dispatch(removeUser());

  useEffect(() => {
    if (!user.token) {
      navigate('/login')
    }
  }, [user.token])

  return (
    <div className='page'>
      <header className='mainHeader'>
        <img src={logo} alt='Logo' style={{ objectFit: 'contain', width: '16rem' }} />
        <button onClick={onLogout}>Log Out</button>
      </header>

      <div style={{ display: 'flex' }}>
        <Aside user={user}/>
        <Main image={user.image || avatar}/>
      </div>
    </div>
  )
}

export default Home