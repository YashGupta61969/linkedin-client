import React from 'react'
import avatar from '../../assets/logos/user.png'

import './aside.css'

const Aside = ({ user }) => {

  return (
    <div className='aside'>
      <div className='profilePic'>
        <img src={user.image || avatar} />
      </div>
      <p className='name'>{user.name}</p>

      {user.about && <div className='about'>
        <p>{user.about}</p>
      </div>}

      <div className='followings'>
        <p>Followers : {user.followers?.length}</p>
        <p style={{ marginLeft: "1rem", marginRight: "1rem" }}>|</p>
        <p>Following : {user.following?.length}</p>
      </div>

      {user.skills?.length ? <>
        <strong style={{ marginTop: '2rem', fontSize: '2rem', fontWeight: 300 }}>Skills</strong>

        <div className='skills'>
          <p>React Js</p>
          <p>MongoDb</p>
          <p>NodeJs</p>
          <p>React Native</p>
          <p>My SQL</p>
        </div>
      </> : null}
    </div>
  )
}

export default Aside