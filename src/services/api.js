export const login = async (email, password) => {
    const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email, password
        })
    })
    const data = await response.json()
    const status = response.status;

    return [data, status];
}

export const signup = async (name, email, password, about, image) => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('about', about)
    formData.append('image', image)

    const response = await fetch('http://localhost:8000/signup', {
        method: 'POST',
        body: formData
    })
    const data = await response.json()
    const status = response.status;

    return [data, status];
}

export const getAllPosts = async () => {
    const response = await fetch('http://localhost:8000/post', {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await response.json()

    return data;
}

export const getSinglePost = async (id) => {
    const response = await fetch(`http://localhost:8000/post/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response.json()
}

export const addPost = async (authorId, caption, image) => {
    const formData = new FormData();
    formData.append('authorId', authorId)
    formData.append('caption', caption)
    image && formData.append('image', image)

    const response = await fetch('http://localhost:8000/post', {
        method: 'POST',
        body: formData
    })
    const data = await response.json()

    return data;
}

export const follow = async (currentUserId, otherUserId) => {
    const response = await fetch('http://localhost:8000/follow', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            followedBy: currentUserId,
            followedTo: otherUserId
        })
    })

    return await response.json()
}

export const unfollow = async (currentUserId, otherUserId) => {
    return fetch('http://localhost:8000/unfollow', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            unfollowedBy: currentUserId,
            unfollowedTo: otherUserId
        })
    })
}

export const addLike = async (postId, userId) => {
    return fetch(`http://localhost:8000/like/${postId}?userid=${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export const removeLike = async (postId, userId) => {
    return await fetch(`http://localhost:8000/unlike/${postId}?likeid=${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export const addComment = async (postId, message, userid) => {
    const response = await fetch(`http://localhost:8000/comment/${postId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message,
            userid,
        })
    })
    return response.json()
}