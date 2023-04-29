import React from 'react'
import { IoIosAdd, IoIosRemove } from 'react-icons/io'
import './button.css'

const Button = ({ text, onClick, size, icon }) => {
  return (
    <button onClick={onClick} className={`button ${size === 'large' && 'buttonBig'}`}>
      {
        icon && (icon === 'add' ? <IoIosAdd className='followIcon' /> : <IoIosRemove className='followIcon'/>)
      }
      <strong>{text}</strong>
    </button>
  )
}

export default Button