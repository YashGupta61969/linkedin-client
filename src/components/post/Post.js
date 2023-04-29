import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { FaRegComment } from 'react-icons/fa'
import { AiOutlineLike, AiFillLike } from 'react-icons/ai'
import { addLike, follow, removeLike, unfollow } from '../../services/api'
import avatar from '../../assets/logos/user.png'
import './post.css'
import Button from '../button/Button'

const Post = ({ item }) => {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user)
    const [liked, setLiked] = useState(item.likedBy.find(el => el === user._id))
    const [isFollowing, setIsFollowing] = useState(user.following && user.following.find(f => f === item.author._id))

    const addLikeToPost = async () => {
        await addLike(item._id, user._id)
        setLiked(true)
    }

    const removeLikeFromPost = async () => {
        await removeLike(item._id, user._id)
        setLiked(false)
    }

    const comment = () => navigate(`/post/${item._id}`);

    const changeFollow = async () => {
        if (isFollowing) {
            await unfollow(user._id, item.author._id)
        } else {
           const data = await follow(user._id, item.author._id)
        }
    }

    return (
        <div className='post'>
            <div className="postUser">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={item.author?.image || avatar} alt='' />
                    <div className='postUserName'>
                        <strong>{item.author?.name.toUpperCase()}</strong>
                        <p>{item.author?.about}</p>
                    </div>
                </div>
                {user._id !== item.author._id && (isFollowing ? <Button text={'Unfollow'} icon={'remove'} onClick={changeFollow} /> : <Button text={'Follow'} icon={'add'} onClick={changeFollow} />)}
            </div>

            <div className="postContent">
                {item.caption && <p>{item.caption}</p>}
                {item.image && <img src={item.image} alt='' />}
                {liked ? <AiFillLike className='postIcon' color='#0B67C2' onClick={removeLikeFromPost} /> : <AiOutlineLike className='postIcon' onClick={addLikeToPost} />}
                <FaRegComment className='postIcon' onClick={comment} />
            </div>
        </div>
    )
}

export default Post