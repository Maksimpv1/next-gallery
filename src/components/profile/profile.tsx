'use client'

import { useEffect, useState } from 'react'
import { FavoritCards } from './favoritCard/favCards'
import styles from './profile.module.css'
import { SortAllPhotos } from './sortProfile/sort'
import { useAppSelectorType } from '@/redux/store/store'

export interface IPhoto {
    url: string;
    discription: string;
    likes: number;
    date:string;
}

  
  export const Profile = () => {

    const photoFav = useAppSelectorType((state)=> state.gallery.favorits)

    const sortProf = useAppSelectorType((state) => state.gallery.profSortValue)

    const sortedPhotoFav = [...photoFav];

    const [sortedPhotos, setSortedPhotos] = useState<IPhoto[]>([])
    
    useEffect(() => {
        switch (sortProf) {
            case 'Data':
                const sortedByDate = [...photoFav].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setSortedPhotos(sortedByDate);
                break;
            case 'Popular':
                const sortedByLikes = [...photoFav].sort((a, b) => b.likes - a.likes);
                setSortedPhotos(sortedByLikes);
                break;
            case 'Reset':
                setSortedPhotos([...photoFav]);
                break;
            default:
                break;
        }
    }, [sortProf, photoFav]);
    

    return(
        <div className={styles.container}>
            <ul className={styles.sort_container}>
                <SortAllPhotos/>
            </ul>
            <div>
                <div className={styles.card_img__container}>
                    {sortedPhotos.map((photo: IPhoto , index:number) => (                    
                        <FavoritCards key={index} src={photo.url} discription={photo.discription} likes={photo.likes} date={photo.date} />
                    ))}
                </div>
            </div>
        </div>
    )
}