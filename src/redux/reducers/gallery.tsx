import { axiosApiConfig } from "@/api/axiosConfig"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface IinitialState{
    getPhotos:any,
}


const initialState:IinitialState = {
    getPhotos:{}
}

export const getPhotos = createAsyncThunk(
    "photos",
    async() => {
        try{
            const response = await axiosApiConfig.get('')
            const gotFilms = response.data
            console.log(gotFilms)                
        }catch(error: unknown){
            console.log("Ошибка получения данных")
        }
    }
)



export const gallerySlice = createSlice({
    name:"Photos",
    initialState,
    reducers:{ 
    },
})
