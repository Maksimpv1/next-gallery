'use client'

import { axiosApiConfig } from "@/api/axiosConfig"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { StoreType } from "../store/store";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { dbFirebase, auth } from "@/services/firebase";
import { IinitialStateAuth } from "./authorisation";

interface IinitialState{
    photos:any,
    loadingPhotos:boolean,
    pageNumber:number,
    searchValue:string,
    isAuthRed:boolean,
    favorits:any[],
}


const initialState:IinitialState = {
    photos:[],
    loadingPhotos:false,
    pageNumber:1,
    searchValue:'all',
    isAuthRed:false,
    favorits:[],

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

export const addPhotoToFavorits = createAsyncThunk(
    "photos/addPhotosToFav",
    async (photo: { urls: { full: string }; alt_description: string }, { getState }) => {
        const state = getState() as { gallery: IinitialState, auth: IinitialStateAuth };
        const photoRef = doc(dbFirebase, 'favorits', state.auth.user.uid);
        
        try {
            const docSnap = await getDoc(photoRef);

            if (docSnap.exists()) {
                await updateDoc(photoRef, {
                    favorits: state.gallery.favorits
                        ? [...state.gallery.favorits, { url: photo.urls.full, discription: photo.alt_description }]
                        : [{ url: photo.urls.full, discription: photo.alt_description }],
                });
                console.log('Фото успешно добавлено в избранное');
            } else {
                await setDoc(photoRef, {
                    favorits: [{
                        url: photo.urls.full,
                        discription: photo.alt_description
                    }],
                });
                console.log('Фото успешно добавлено в избранное');
            }
        } catch (error: unknown) {
            console.log("Ошибка добавления фото - " + error);
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
        },
        getFavoritPhoto: (state, action) => {
            state.favorits = action.payload.photoData.favorits
        },
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
    setPhotos, setPage, setSearchValue, getFavoritPhoto } = gallerySlice.actions
