import React from 'react'
import './main.css'
import { AiOutlineLike } from 'react-icons/ai'
import { BiImageAdd } from 'react-icons/bi'
import { FaRegComment } from 'react-icons/fa'

function Main({ image }) {

  const addImage = ()=>{

  }

  return (
    <div className='main'>
      <div className='addPost'>
        <img src={image} alt='user' />
        <input type='text' placeholder='Start A Post' />
        <BiImageAdd style={{color:'black',fontSize:'3rem'}} onClick={addImage}/>
      </div>

      <div className='posts'>
          <div className='post'>
              <div className='postUser'>
                 <img src={image}/>
                 <div className='postUserName'>
                    <strong>Yash</strong>
                    <p>Mern | React Native Developer</p>
                 </div>
              </div>
              {/* <img/> */}
              <div className='caption'>
                  <p>The Cations Lokks Something Just Like This. du dudu dudu du </p>
              </div>
              <AiOutlineLike style={{color:'black',fontSize:'3rem',cursor:'pointer'}}/>
              <FaRegComment style={{color:'black',fontSize:'3rem', marginLeft:'2rem',cursor:'pointer'}}/>
          </div>
      </div>
    </div>
  )
}

export default Main