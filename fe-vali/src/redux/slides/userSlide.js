import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    username: '',
    email: '',
    mobile: '',
    address: '',
    avatar: '',
    //access_token: '',
    id: '',
    isAdmin: false,
    city: '',
    //refreshToken: ''
}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { username = '', email = '', access_token = '', address = '', mobile = '', avatar = '', _id = '', isAdmin,city= '',refreshToken = '' } = action.payload
            state.username = username ? username : state.username;
            state.email = email ? email : state.email;
            state.address = address ? address : state.address;
            state.mobile = mobile ? mobile : state.mobile;
            state.avatar = avatar ? avatar : state.avatar;
            state.id = _id ? _id : state.id
            state.access_token = access_token ? access_token : state.access_token;
            state.isAdmin = isAdmin ? isAdmin : state.isAdmin;
            state.city = city ? city : state.city;
            state.refreshToken = refreshToken ? refreshToken : state.refreshToken;
        },
        resetUser: (state) => {
            state.username = '';
            state.email = '';
            state.address = '';
            state.mobile = '';
            state.avatar = '';
            state.id = '';
            state.access_token = '';
            state.isAdmin = false;
            state.city = '';
            state.refreshToken = ''
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer