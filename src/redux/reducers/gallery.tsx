'use client'

import { axiosApiConfig } from "@/api/axiosConfig"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface IinitialState{
    photos:any,
    loadingPhotos:boolean,
}


const initialState:IinitialState = {
    photos:[],
    loadingPhotos:false,
}

export const getPhotos = createAsyncThunk(
    "photos",
    async ({ page, sortValue }: { page: number, sortValue: string }, { dispatch }) => {
        try {
            console.log(sortValue)
            const response = await axiosApiConfig.get(`?page=${page}&per_page=10&query=?${sortValue}`);
            const gotPhotos = response.data;
            dispatch(setPhotos({ photos: gotPhotos, page })); 
        } catch (error: unknown) {
            console.log("Ошибка получения данных");
        }
    }
);

export const gallerySlice = createSlice({
    name: "Photos",
    initialState,
    reducers: {
        setPhotos: (state, action) => {
            state.photos = action.payload.photos; 
        }
    },    
    extraReducers: (builder) =>
    builder
      .addCase(getPhotos.pending, (state) => {
        state.loadingPhotos = true;
      })
      .addCase(getPhotos.fulfilled, (state) => {
        state.loadingPhotos = false;
      })
      .addCase(getPhotos.rejected, (state) => {
        state.loadingPhotos = false;
      })
});

export const { 
    setPhotos } = gallerySlice.actions
