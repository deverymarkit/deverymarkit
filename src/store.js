import { configureStore, createSlice } from '@reduxjs/toolkit';


const loginData = createSlice({
    name: 'loginData',
    initialState: {
        "_id": null,
        "username": null,
        "email": null,
        "accountname": null,
        "image": null,
        "token": null
    },
    reducers: {
        loginUpdate(state, data) {
            return { ...data.payload }
        }
    }
})

export const { loginUpdate } = loginData.actions

export default configureStore({
    reducer: {
        loginData: loginData.reducer
    }
})