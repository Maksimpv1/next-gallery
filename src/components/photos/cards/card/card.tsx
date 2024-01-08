'use client'

import Image from 'next/image'

import styles from './card.module.css'
import { useState } from 'react'
import { AppDispatch, useAppSelectorType } from '@/redux/store/store'
import { useDispatch } from 'react-redux'
import { addPhotoToFavorits } from '@/redux/reducers/gallery'
import { dbFirebase, auth } from "@/services/firebase";

interface Ipthoto{
    photo:any
}

export const CardPhoto: React.FC<Ipthoto> = ( {photo} ) => {
    const [ btnState, setbtnState] = useState<boolean>(false)

    const dispatch = useDispatch<AppDispatch>()

    
    const loginState = useAppSelectorType((state) => state.auth.logState)

    const addToFavorits = async () => {
        dispatch(addPhotoToFavorits({ urls: { full: photo.urls.full }, alt_description: photo.alt_description }));
    }

   const deleteFavorits = async () => {
      // dispatch(deleteFilmsFromFavorits(props))
   }
    
    return(
        <div className={styles.container}>
            <div className={styles.info__image}>                         
                <Image src={photo.urls.full} 
                    alt="Your image"
                    className={styles.card_img}
                    width={150}
                    height={150}
                ></Image>
            </div>   
            <div className={styles.add_cardInfo}>
                <p>{photo.alt_description}</p>
                {!btnState ? <button disabled={!loginState} onClick={addToFavorits}>Add</button> : <button onClick={deleteFavorits}>Delete</button>}
            </div>
        </div>
    )
}