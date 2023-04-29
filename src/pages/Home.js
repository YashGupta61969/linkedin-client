import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import avatar from '../assets/logos/user.png'
import Header from '../components/header/Header'
import Aside from '../components/aside/Aside'
import Main from '../components/main/Main'

const Home = () => {
  const { user } = useSelector(state => state.user)
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.token) {
      navigate('/login')
    }
  }, [user.token])

  return (
    <div className='page'>
      <Header />
      <div style={{ display: 'flex' }}>
        <Aside user={user} />
        <Main image={user.image || avatar} />
      </div>
    </div>
  )
}

export default Home