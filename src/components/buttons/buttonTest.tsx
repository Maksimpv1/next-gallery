'use client'

import { getPhotos } from "@/redux/reducers/gallery"
import { AppDispatch } from "@/redux/store/store"
import { useDispatch } from "react-redux"

export const ButtonTest = () => {

    const dispatch = useDispatch<AppDispatch>()

    const handledata = () => {
        dispatch(getPhotos())
    }

    return(
        <div>
            <button onClick={handledata}>Click</button>
        </div>
    )
}