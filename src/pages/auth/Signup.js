import React, { useEffect, useState } from 'react'
import png from '../../assets/logos/login.png'
import avatar from '../../assets/logos/user.png'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Header from '../../components/header/Header'
import { signup } from '../../services/api'

const Signup = () => {
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

  const removeImage = () => {
    setImage('')
    setImagePreview('')
  }

  const submit = async (e) => {
    e.preventDefault();
    const [data, status] = await signup(name, email, password, about, image)
    if (status === 200) {
      navigate('/login')
    } else {
      alert(data.message)
    }
  }

  return (
    <>
      <Header />
      <div className='container'>
        <div className='left'>
          <h1 className='tagline'>Welcome to your <br /> professional community</h1>

          <form onSubmit={submit} className='authForm'>
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
          </form>

        </div>

        <img src={png} alt='logo' className='loginImg' />
      </div>

    </>
  )
}

export default Signup