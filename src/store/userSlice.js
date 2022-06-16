import {createSlice} from '@reduxjs/toolkit'

const userSlice=createSlice({
    name:"user",
    initialState:{
        userObj:{

        },
        usLoginSuccess:false
    },
    reducers:{
        clearLoginStatus: (state, action) => {
            state.usLoginSuccess = false;
            return state;
        },
        userLogin: (state,action)  =>  {
            console.log("data in  user slice",action.payload)
            state.userObj=action.payload.user
            state.usLoginSuccess=true;
            let token=action.payload.token;
            localStorage.setItem("token",token)
            localStorage.setItem("usLoginSuccess",true)
            localStorage.setItem("Name",state.userObj.name)
            return state;
        }
    }
})

export default userSlice.reducer
export const {clearLoginStatus,userLogin} =userSlice.actions;