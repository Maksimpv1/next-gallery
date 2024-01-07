'use client'

import { useDispatch } from 'react-redux'
import styles from './cards.module.css'
import { AppDispatch, useAppSelectorType } from '@/redux/store/store'
import { getPhotos } from '@/redux/reducers/gallery'
import { CardPhoto } from './card/card'

export const Cards = () => {
    const dispatch = useDispatch<AppDispatch>()

    const photos = useAppSelectorType((state) => state.gallery.photos)

    const handleClik = () =>{
        console.log(photos)
    }

    return(
        <div>
            <button onClick={handleClik}>
                Click
            </button>
            <div className={styles.card_img__container}>
                {photos.map((item:any, index:number)=>(
                    <CardPhoto key={index} photo ={ item }/>
                ))}
            </div>
        </div>
    )
}