'use client'

import { useEffect, useState } from 'react'
import { Cards } from './cards/cards'
import styles from './photos.module.css'
import { SortAllPhotos } from './sort/sort'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelectorType } from '@/redux/store/store'
import { getPhotos, setPage } from '@/redux/reducers/gallery'
import { Box, CircularProgress } from '@mui/material'

export const Photos = () => {
    const dispatch = useDispatch<AppDispatch>()

    const loadingPhotos = useAppSelectorType((state)=> state.gallery.loadingPhotos)

    const page = useAppSelectorType((state)=> state.gallery.pageNumber)


    const [disableBtn, setDisableBtn] = useState<boolean>(false);


    useEffect(() => {
        if (page <= 1) {
            setDisableBtn(true);
        } else {
            setDisableBtn(false);
        }
    }, [page]);

    const handleNextPage = () => {
        dispatch(setPage(1))
    };

    const handlePrevPage = () => {
        dispatch(setPage(2))
    };




    return(
        <div className={styles.container}>
            <ul className={styles.sort_container}>
                <SortAllPhotos />
            </ul>
            <div>
                <Cards/>
                {loadingPhotos ? <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center' }}>
                    <CircularProgress /></Box> : null}
                <div className={styles.container_swap}>                    
                    <button disabled={disableBtn} onClick={handlePrevPage}>⬅</button>
                    <span>{page}</span>
                    <button onClick={handleNextPage}>➡</button>
                </div>
            </div>
        </div>
    )
}