import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : undefined,
    token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : undefined
}

const authSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser(state,action){
            state.setUser=action.payload;
        },
        setToken(state,action){
            state.token=action.payload;
        }
    }
})

export const {setUser, setToken}=authSlice.actions;
export default authSlice.reducer;