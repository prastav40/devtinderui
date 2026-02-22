import { createSlice } from "@reduxjs/toolkit";

const connectionslice = createSlice({
    name:"connections",
    initialState:null,
    reducers:{
        showconnections:(state,action)=>{
            return action.payload
        }
    }
})

export const {showconnections}=connectionslice.actions
export default connectionslice.reducer