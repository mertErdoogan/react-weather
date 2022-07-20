import { configureStore } from "@reduxjs/toolkit";
import getApiKey from "./getApiKey";
import homeSlice from "./homeSlice";

export default configureStore({
    reducer: {
        getApiKey: getApiKey,
        homeSlice: homeSlice
    }
});