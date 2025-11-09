import { createSlice } from "@reduxjs/toolkit";
// import { logout } from "../../tem1";

let initialState = {
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true",

}
let authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state) => {
            // console.log("login called");
            state.isAuthenticated = true;
            // ✅ Save to localStorage
            localStorage.setItem("isAuthenticated", "true");
        },
        logout: (state) => {
            state.isAuthenticated = false
            
      // ✅ Remove login status
            localStorage.removeItem("isAuthenticated");
        },
    }
})

export let { login, logout } = authSlice.actions;
export default authSlice.reducer;