import React, { useEffect, useState } from 'react'
import './main.css'
import avatar from '../../assets/logos/user.png'
import { BiImageAdd } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import Post from '../post/Post'
import { addPost, getAllPosts } from '../../services/api'

const Main = () => {

  const [postCaption, setPostCaption] = useState('')
  const [postImage, setPostImage] = useState('')
  const [posts, setPosts] = useState([])
  const [shouldComponentUpdate, setShouldComponentUpdate] = useState(false)
  const [imagePreview, setImagePreview] = useState('')
  const { user } = useSelector(state => state.user)

  useEffect(() => {
    (async () => {
      const data = await getAllPosts()
      setPosts(data)
    })()
  }, [shouldComponentUpdate])

  const changeCaption = (e) => setPostCaption(e.target.value);

  const addImage = (e) => {
    const selectedImage = e.target.files[0];
    setPostImage(selectedImage)

    if (selectedImage) {
      const objUrl = URL.createObjectURL(selectedImage)
      setImagePreview(objUrl)
    }
  }

  const uploadPost = async () => {
    try {
      await addPost(user._id, postCaption, postImage)
      setPostCaption('')
      setPostImage('')
      setImagePreview('')
      setShouldComponentUpdate(prev => !prev)
      alert('Submitted')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='main'>
      <div className='addPost'>
        <div className='topInputs'>
          <img src={user.image || avatar} alt='user' />
          <input type='text' placeholder='Start A Post' value={postCaption} onChange={changeCaption} />
          <label htmlFor="postImg" style={{ cursor: 'pointer' }}>
            <BiImageAdd className='addPostImageIcon' />
          </label>
          <input type="file" style={{ display: 'none' }} id='postImg' onChange={addImage} />
          <button onClick={uploadPost}>Submit</button>
        </div>

        {imagePreview && <div className='preview'>
          <img src={imagePreview} alt='preview' />
        </div>}
      </div>

      <div className='posts'>
        {posts.length !== 0 && posts.map(item => {
          return <Post item={item} userId={user._id} key={user._id} />
        })}
      </div>
    </div>
  )
}

export default Main