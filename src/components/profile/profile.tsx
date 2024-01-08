'use client'

import { FavoritCards } from './favoritCard/favCards'
import styles from './profile.module.css'
import { SortAllPhotos } from './sortProfile/sort'
import { useAppSelectorType } from '@/redux/store/store'

  
  export const Profile = () => {

    const photoFav = useAppSelectorType((state)=> state.gallery.favorits)

    const handleClick = () => {
        console.log(photoFav)
    }
    

    return(
        <div className={styles.container}>
            <ul className={styles.sort_container}>
                <SortAllPhotos/>
            </ul>
            <div>
                <button onClick={ handleClick }>Clock</button>
                <FavoritCards/>
                {/* {loadingPhotos ? <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center' }}>
                    <CircularProgress /></Box> : null} */}
            </div>
        </div>
    )
}