import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getApiKey = createSlice({
  name: "getApiKey",
  initialState: {
    localApi: localStorage.getItem("api_key") ? true : false,
    apiInputValue: "",
    hasApiKey: cookies.get("hasApikey") ? true : false,
    apiKey: "",
  },
  reducers: {
    handleSetApiKey: (state) => {
      fetch("/turkey-provinces.json")
        .then((res) => res.json())
        .then((result) => {
          state.provinceOption.push([...result]);
        });
      if (!state.localApi) {
        state.localApi = true;
        localStorage.setItem("api_key", state.apiInputValue);
      } else {
        const apikey = localStorage.getItem("api_key");
        if (apikey === state.apiInputValue) {
          state.hasApiKey = true;
          cookies.set("hasApikey", "1");
        } else {
          alert("Wrong Api Key");
        }
      }
    },
    showApiKey: (state) => {
      if (localStorage.getItem("api_key")) {
        state.apiKey = localStorage.getItem("api_key")
          ? localStorage.getItem("api_key")
          : null;
      } else {
        state.apiKey = "there is no apikey yet.";
      }
    },
    handleInputValue: (state, payload) => {
      state.apiInputValue = payload.payload;
    },
  },
});

export const { showApiKey, handleSetApiKey, handleInputValue } =
  getApiKey.actions;
export default getApiKey.reducer;
