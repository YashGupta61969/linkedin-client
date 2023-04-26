import React, { useEffect, useState } from 'react'
import logo from '../assets/logos/LI-Logo.png'
import png from '../assets/logos/login.png'
import avatar from '../assets/logos/user.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Signup() {
  const navigate = useNavigate()
  const { token } = useSelector(state => state.user)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [about, setAbout] = useState('')
  const [image, setImage] = useState('')
  const [imagePreview, setImagePreview] = useState('')

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  const selectImage = (e) => {
    const selected = e.target.files[0];
    setImage(selected)

    if (selected) {
      const objUrl = URL.createObjectURL(selected)
      setImagePreview(objUrl)
    }
  }

  const onNameChange = (e) => setName(e.target.value);
  const oneEmailChange = (e) => setEmail(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);
  const onAboutChange = (e) => setAbout(e.target.value);

  const removeImage = () =>{
      setImage('')
      setImagePreview('')
  }

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append('name',name)
    formData.append('email',email)
    formData.append('password',password)
    formData.append('about',about)
    formData.append('media',image)

    const json = await fetch('http://localhost:8000/signup', {
      method: 'POST',
      body: formData
    })
    const response = await json.json();

    if (json.status === 200) {
      navigate('/login')
    } else {
      alert(response.message)
    }
  }

  return (
    <div className='authPage'>
      <header className='header'>
        <img src={logo} alt='Logo' style={{ objectFit: 'contain', width: '16rem' }} />
        <Link to={'/login'}>Login</Link>
      </header>

      <div className='authWrapper'>
        <div>
          <h1 className='tagline'>Welcome to your <br /> professional community</h1>

          <div className='authForm'>

            <div className='signupUserImage'>
              <img src={imagePreview || avatar} alt='' />
              
              {
                imagePreview ? <p onClick={removeImage}>Remove Image</p> : <label htmlFor='userImg'>Upload Image</label>
              }
              <input type='file' id='userImg' style={{ display: 'none' }} onChange={selectImage} accept="image/*" />
            </div>

            <label>Name</label>
            <input type='name' value={name} onChange={onNameChange} />

            <label>Email Address</label>
            <input type='email' value={email} onChange={oneEmailChange} />

            <label>Password</label>
            <input type='password' value={password} onChange={onPasswordChange} />

            <label>About</label>
            <input type='text' value={about} onChange={onAboutChange} placeholder='Tell Us About Yourself' />

            <button onClick={submit}>Sign Up</button>
          </div>
        </div>

        <div className='loginImg'>
          <img src={png} alt='logo' />
        </div>
      </div>

    </div>
  )
}

export default Signup