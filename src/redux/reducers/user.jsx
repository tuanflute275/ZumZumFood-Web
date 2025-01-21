import { createSlice } from "@reduxjs/toolkit";

const userData =
  localStorage.getItem("user") !== null
    ? JSON.parse(localStorage.getItem("user"))
    : {};

const setUserData = (item) => {
  localStorage.setItem("user", JSON.stringify(item));
};

const tokenData =
  localStorage.getItem("token") !== null
    ? JSON.parse(localStorage.getItem("token"))
    : {};

const setTokenData = (item) => {
  localStorage.setItem("token", JSON.stringify(item));
};

const clearDataLocalStorage = () => {
  localStorage.clear();
};

const clearDataLocalStorageByKey = (key) => {
  localStorage.removeItem(key);
};

const initState = {
  user: userData,
};

const initToken = {
  token: tokenData,
};

const initLoginData = {
  usernameOrEmail: "",
  password: ""
};

export const userSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      console.log(state);
      setUserData(state.user);
    },
    getUser: (state, action) => {
      return {
        ...state.user,
      };
    },
    reset: () => initState,
    //token
    setToken(state, action) {
      state.token = action.payload;
      console.log(state);
      setTokenData(state.token);
    },
    getToken: (state, action) => {
      return {
        ...state.token,
      };
    },
    clearData: () => {
      clearDataLocalStorage();
    },
    clearDataByKey: (state, action) => {
      const key = action.payload; 
      localStorage.removeItem(key);
    },
    resetToken: () => initToken,
  },
});

export const {
  setUser,
  getUser,
  reset,
  setToken,
  getToken,
  clearData,
  clearDataByKey,
  resetToken
} = userSlice.actions;
export const selectUserData = (state) => state.user;
export default userSlice.reducer;
