'use client'

import { axiosApiConfig } from "@/api/axiosConfig"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { StoreType } from "../store/store";

interface IinitialState{
    photos:any,
    loadingPhotos:boolean,
    pageNumber:number,
    searchValue:string
}


const initialState:IinitialState = {
    photos:[],
    loadingPhotos:false,
    pageNumber:1,
    searchValue:'all',

}

export const getPhotos = createAsyncThunk(
    "photos",
    async ({ page }: { page: number }, { dispatch, getState  }) => {     
        const state = getState() as StoreType;
        try {
            const searchValue = state.gallery.searchValue
            const response = await axiosApiConfig.get(`?query=${searchValue}&page=${page}&per_page=10`);   
            const gotPhotos = response.data.results;
            
            console.log(gotPhotos)
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
        },
        setSearchValue: (state, action ) => {
            state.searchValue = action.payload
        },
        setPage: (state, action) =>{
            console.log(state.searchValue)
            switch(action.payload){
                case 1:
                    state.pageNumber = state.pageNumber + 1  
                    break;
                case 2: 
                    state.pageNumber = state.pageNumber - 1
                    break;                    
                case 0: 
                state.pageNumber = 1
                break;
            }
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
    setPhotos, setPage, setSearchValue } = gallerySlice.actions
