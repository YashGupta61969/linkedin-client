import React, { useEffect, useState } from 'react'
import logo from '../assets/logos/LI-Logo.png'
import png from '../assets/logos/login.png'
import './login.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToken, addUser } from '../store/slices/userSlice'
import { useNavigate } from 'react-router-dom'

function Login() {
  const { token } = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  const oneEmailChange = (e) => setEmail(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  const submit = async (e) => {
    e.preventDefault();

    const json = await fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email, password
      })
    })
    const response = await json.json();
    if (json.status === 200) {
      const dataToStore = {
        ...response.response,
        token: response.token
      }
      dispatch(addUser(dataToStore))
      navigate('/')
    } else {
      alert(response.message)
    }
  }

  return (
    <div className='authPage'>
      <header className='header'>
        <img src={logo} alt='Logo' style={{ objectFit: 'contain', width: '16rem' }} />
        <Link to={'/signup'}>Sign Up</Link>
      </header>

      <div className='authWrapper'>
        <div>
          <h1 className='tagline'>Welcome to your <br /> professional community</h1>

          <form onSubmit={submit} className='authForm'>
            <label>Email Address</label>
            <input type='email' value={email} onChange={oneEmailChange} />

            <label>Password</label>
            <input type='password' value={password} onChange={onPasswordChange} />

            <button>Login</button>
          </form>
        </div>

        <img src={png} alt='logo' />
      </div>

    </div>
  )
}

export default Login