import React, { useEffect, useState } from 'react'
import png from '../../assets/logos/login.png'
import './login.css'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../../store/slices/userSlice'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/header/Header'
import { login } from '../../services/api'

const Login = () => {
  const { user } = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (user.token) {
      navigate('/')
    }
  }, [user.token])

  const oneEmailChange = (e) => setEmail(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  const submit = async (e) => {
    e.preventDefault();

    const response = await login(email, password)
    const data = await response.json();

    if (response.status === 200) {
      const dataToStore = {
        ...data.response,
        token: data.token
      }

      localStorage.setItem('user', JSON.stringify(dataToStore))
      dispatch(addUser(dataToStore))
      navigate('/')
    } else {
      alert(data.message)
    }
  }

  return (
    <>
      <Header button={'large'} />
      <div className='container'>
        <div className="left">
          <h1 className='tagline'>Welcome to your <br /> professional community</h1>
          <form onSubmit={submit} className='authForm'>
            <label>Email Address</label>
            <input type='email' value={email} onChange={oneEmailChange} />

            <label>Password</label>
            <input type='password' value={password} onChange={onPasswordChange} autoComplete='on' />

            <button>Login</button>
          </form>

        </div>
        <img src={png} alt='logo' className='loginImg' />
      </div>
    </>
  )
}

export default Login