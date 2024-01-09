'use client'

import Image from 'next/image'

import styles from './card.module.css'
import { useEffect, useState } from 'react'
import { AppDispatch, useAppSelectorType } from '@/redux/store/store'
import { useDispatch } from 'react-redux'
import { addPhotoToFavorits, deletePhotoFromFavorits } from '@/redux/reducers/gallery'
import { dbFirebase, auth } from "@/services/firebase";
import { useAuth } from '@/components/registration/auth'

interface Ipthoto{
    photo:any
}

export const CardPhoto: React.FC<Ipthoto> = ( {photo} ) => {
    const [inPhotolist, setInPhotolist] = useState<boolean>(false)

    const dispatch = useDispatch<AppDispatch>()

    const favPhotos = useAppSelectorType((state)=>state.gallery.favorits)

    
    const loginState = useAppSelectorType((state) => state.auth.logState)

    const addToFavorits = async () => {
        dispatch(addPhotoToFavorits({ urls: { full: photo.urls.full }, alt_description: photo.alt_description,  likes:photo.likes}));
    }
   const { isAuth } = useAuth();

    useEffect(()=>{
        if(isAuth){
            setInPhotolist(favPhotos.some((item) => item.url === photo.urls.full)) 
        } else {
            setInPhotolist(false)
        }
    },[favPhotos])

    const deleteFavorits = async () => {
        dispatch(deletePhotoFromFavorits(photo.urls.full));
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
                {!inPhotolist ? <button disabled={!loginState} onClick={addToFavorits}>Add</button> : <button onClick={deleteFavorits}>Delete</button>}
            </div>
        </div>
    )
}