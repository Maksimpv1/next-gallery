import { TypedUseSelectorHook, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { gallerySlice } from "../reducers/gallery";
import { authSlice } from "../reducers/authorisation";

export const store = configureStore ({
    reducer: {
        gallery:gallerySlice.reducer,
        auth:authSlice.reducer,
    }
})

export type StoreType = ReturnType<typeof store.getState>;

export const useAppSelectorType: TypedUseSelectorHook<StoreType> = useSelector;

export type AppDispatch = typeof store.dispatch;