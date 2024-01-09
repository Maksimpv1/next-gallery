'use client'

import { useDispatch } from "react-redux"
import styles from "./favCards.module.css"
import Image from "next/image"
import { AppDispatch } from "@/redux/store/store"
import { deletePhotoFromFavorits } from "@/redux/reducers/gallery"

interface IFavoritCards{
    src:string,
    discription:string,
    likes:number,
    date:string,
}

export const FavoritCards = (props:IFavoritCards) => {

    const dispatch = useDispatch<AppDispatch>()

    const deleteFavorits = async () => {
        dispatch(deletePhotoFromFavorits(props.src));
    }
    
    return(
        <div className={styles.container}>
            <p>{props.date}</p>
            <div className={styles.info__image}>                         
                <Image src={props.src} 
                    alt="Your image"
                    className={styles.card_img}
                    width={150}
                    height={150}
                ></Image>
            </div>   
            <div className={styles.add_cardInfo}>
                <p>{props.discription}</p>
                <button onClick={deleteFavorits}>Delete</button>
            </div>
            <p>Likes: {props.likes}</p>
        </div>
    )
}