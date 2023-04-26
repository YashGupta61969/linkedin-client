import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {}
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, { payload }) => {
            localStorage.setItem('user', JSON.stringify(payload))
            state.user = payload
        },
        removeUser: (state) => {
            localStorage.clear()
            state.user = ''
        },
    }
})

export default userSlice.reducer

export const { addUser, removeUser } = userSlice.actions