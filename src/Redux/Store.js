import { configureStore } from '@reduxjs/toolkit'
import MainSlice from "./Slices/Main"
export const Store = configureStore({
    reducer: {
        MainSlice 
    }
});