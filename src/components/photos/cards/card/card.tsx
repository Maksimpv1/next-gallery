'use client'

import Image from 'next/image'

import styles from './card.module.css'
import { useState } from 'react'

interface Ipthoto{
    photo:any
}

export const CardPhoto: React.FC<Ipthoto> = ( {photo} ) => {
    const [ btnState, setbtnState] = useState<boolean>(false)

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
                {!btnState ? <button>Add</button> : <button>Delete</button>}
            </div>
        </div>
    )
}