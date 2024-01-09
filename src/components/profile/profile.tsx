'use client'

import { useEffect, useState } from 'react'
import { FavoritCards } from './favoritCard/favCards'
import styles from './profile.module.css'
import { SortAllPhotos } from './sortProfile/sort'
import { useAppSelectorType } from '@/redux/store/store'

interface IPhoto {
    url: string;
    discription: string;
    likes: number;
}

  
  export const Profile = () => {

    const photoFav = useAppSelectorType((state)=> state.gallery.favorits)

    const sortProf = useAppSelectorType((state) => state.gallery.profSortValue)

    const sortedPhotoFav = [...photoFav];

    const [sortedPhotos, setSortedPhotos] = useState<IPhoto[]>([])
    
    useEffect(() => {
        switch (sortProf) {
            case 'Data':
                console.log("привет");
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
                        <FavoritCards key={index} src={photo.url} discription={photo.discription} likes={photo.likes}/>
                    ))}
                </div>
            </div>
        </div>
    )
}