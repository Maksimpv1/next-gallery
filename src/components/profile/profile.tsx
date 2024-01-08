'use client'

import styles from './profile.module.css'
import { SortAllPhotos } from './sortProfile/sort'

export const Profile = () => {

    return(
        <div className={styles.container}>
            <ul className={styles.sort_container}>
                <SortAllPhotos/>
            </ul>
            <div>
                {/* {loadingPhotos ? <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center' }}>
                    <CircularProgress /></Box> : null} */}
                <div className={styles.container_swap}>                    
                </div>
            </div>
        </div>
    )
}