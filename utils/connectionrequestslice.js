import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const connectionrequestslice = createSlice({
    name:"connectionrequest",
    initialState:null,
    reducers:{
            showconnectionrequest:(state,action)=>{
                return action.payload
            },
            removerequest:(state,action)=>{
                return state.filter((item)=>item._id !== action.payload)
            }
    }
})

export const {showconnectionrequest,removerequest}=connectionrequestslice.actions
export default connectionrequestslice.reducer