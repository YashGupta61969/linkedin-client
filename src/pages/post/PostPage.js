import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import avatar from '../../assets/logos/user.png'
import Header from '../../components/header/Header'
import Button from '../../components/button/Button'
import './postpage.css'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { IoMdSend } from 'react-icons/io'
import { addComment, addLike, follow, getSinglePost, removeLike, unfollow } from '../../services/api'

const PostPage = () => {
  const { id } = useParams()
  const { user } = useSelector(state => state.user)

  const [post, setPost] = useState({})
  const [liked, setLiked] = useState(post._id === user._id)
  const [commentText, setCommectText] = useState('')
  const [isFollowing, setIsFollowing] = useState(false)

  const isPost = Object.keys(post).length !== 0;

  useEffect(() => {
    (async () => {
      const response = await getSinglePost(id)
      setPost(response)
    })()
  }, [])

  const addLikeToPost = async () => {
    await addLike(post._id, user._id)
    setLiked(true)
  }

  const removeLikeFromPost = async () => {
    await removeLike(post._id, user._id)
    setLiked(false)
  }

  const onCommentTextChange = (e) => setCommectText(e.target.value);

  const addCommentToPost = async () => {
    try {
      const data = await addComment(post._id, commentText, user._id)
      setPost(data)
      setCommectText('')
    } catch (error) {
      console.log(error)
    }
  }

  const changeFollow = async () => {
    if (isFollowing) {
      await unfollow(user._id, post.author._id)
    } else {
      await follow(user._id, post.author._id)
    }
  }

  return (
    <>
      <Header />

      <div className="singlePost">
        <div className="postUser">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={post.author?.image || avatar} alt='' />
            <div className='postUserName'>
              <strong>{post.author?.name.toUpperCase()}</strong>
              <p>{post.author?.about}</p>
            </div>
          </div>
          {isPost && user._id !== post.author._id && (isFollowing ? <Button text={'Unfollow'} icon={'remove'} onClick={changeFollow} /> : <Button text={'Follow'} icon={'add'} onClick={changeFollow} />)}
        </div>

        <div className="postContent">
          {post.caption && <p>{post.caption}</p>}
          {post?.image && <img src={post.image} alt='' />}
          {liked ? <AiFillLike className='postIcon' color='#0B67C2' onClick={removeLikeFromPost} /> : <AiOutlineLike className='postIcon' onClick={addLikeToPost} />}
        </div>

        <div className="comments">
          <div className="addComment">
            <img src={user._image || avatar} alt="" className='commentUserImg' />
            <input type="text" value={commentText} onChange={onCommentTextChange} placeholder='Write A Comment' />
            <IoMdSend size={40} style={{ cursor: 'pointer' }} color='#0B67C2' onClick={addCommentToPost} />
          </div>

          {
            Object.keys(post).length && post.comments.length !== 0 && post.comments.map(comm => {
              return <div className='comment' key={comm._id}>
                <img src={comm.author.image || avatar} alt='' />
                <div>
                  <strong>{comm.author.name}</strong>
                  <p>{comm.message}</p>
                </div>
              </div>
            })
          }

        </div>

      </div>
    </>
  )
}


export default PostPage