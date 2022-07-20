import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";

export const fetchProvinces = createAsyncThunk(
  "province/fetchProvinces",
  () => {
    return axios.get("turkey-provinces.json").then((response) => response.data);
  }
);
export const fetchWeatherByCity = createAsyncThunk(
  "province/fetchWeatherByCity",
  (city) => {
    return axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.label}&appid=555e6dc41aaf42babf495e858a70240d&units=metric`
      )
      .then((response) => response.data);
  }
);

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    weather: "",
    feelsLike: "",
    sky: "",
    provinceOption: [],
    province: "asdf",
  },
  reducers: {
    getProvinces: (state) => {
      fetch("/turkey-provinces.json")
        .then((res) => res.json())
        .then((result) => (state.provinceOption = result));
    },
    getWeatherByCity: (state, payload) => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${payload.label}&appid=555e6dc41aaf42babf495e858a70240d&units=metric`
      )
        .then((res) => res.json())
        .then((res) => {
          state.weather(res.main.temp);
          state.feelsLike(res.main.feels_like);
          state.sky(res.weather[0].main);
        console.log(res);

        });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProvinces.fulfilled, (state, action) => {
      state.provinceOption = action.payload;
    });
    builder.addCase(fetchWeatherByCity.fulfilled, (state, action) => {
      state.weather = action.payload.main.temp;
      state.feelsLike = action.payload.main.feels_like;
      state.sky = action.payload.weather[0].main;
      state.province = action.payload.name;
      console.log(action.payload);
    });
  },
});

export const { getProvinces } = homeSlice.actions;
export default homeSlice.reducer;
