import { TypedUseSelectorHook, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { gallerySlice } from "../reducers/gallery";

export const store = configureStore ({
    reducer: {
        gallery:gallerySlice.reducer
    }
})

export type StoreType = ReturnType<typeof store.getState>;

export const useAppSelectorType: TypedUseSelectorHook<StoreType> = useSelector;

export type AppDispatch = typeof store.dispatch;