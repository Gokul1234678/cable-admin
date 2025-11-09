import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./slices/AuthSlice"

export let store=configureStore({
reducer:{
    auth:authSlice
},
})