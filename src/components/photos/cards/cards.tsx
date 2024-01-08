'use client'

import styles from './cards.module.css'
import { useAppSelectorType } from '@/redux/store/store'
import { CardPhoto } from './card/card'

export const Cards = () => {

    const photos = useAppSelectorType((state) => state.gallery.photos)

    return(
        <div>
            <div className={styles.card_img__container}>
                {photos.map((item:any, index:number)=>(
                    <CardPhoto key={index} photo ={ item }/>
                ))}
            </div>
        </div>
    )
}