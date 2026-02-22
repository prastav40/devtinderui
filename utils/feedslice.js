import { createSlice } from "@reduxjs/toolkit";

const feedslice=createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addfeed:(state,action)=>{
            return action.payload
        },
        removefeed:()=>{
            return null
        }
    }
})

export const {addfeed,removefeed}=feedslice.actions;
export default feedslice.reducer