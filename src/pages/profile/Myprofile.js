import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../../components/header/Header';
import avatar from '../../assets/logos/user.png'
import './myprofile.css'

const Myprofile = () => {
  const { user } = useSelector(state => state.user);

  return (
    <>
      <Header />
      <div className='page center'>
        <div className='profile'>
        <img src={user.image || avatar} alt='' className='profileImg' />
        <h1>{user.name}</h1>
        {user.about && <h3>{user.about}</h3>}

        <div className='profileInfo'>
          <label>Email</label>
          <input typeof='email' value={user.email}/>
          <label>Experience</label>
          <input typeof='email' value={user.email}/>
        </div>
        </div>
      </div>
    </>
  )
}

export default Myprofile