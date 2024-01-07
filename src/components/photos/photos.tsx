'use client'

import { useEffect, useState } from 'react'
import { Cards } from './cards/cards'
import styles from './photos.module.css'
import { SortAllPhotos } from './sort/sort'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelectorType } from '@/redux/store/store'
import { getPhotos } from '@/redux/reducers/gallery'
import { Box, CircularProgress } from '@mui/material'

export const Photos = () => {
    const dispatch = useDispatch<AppDispatch>()

    const loadingPhotos = useAppSelectorType((state)=> state.gallery.loadingPhotos)

    const [page, setPage] = useState<number>(1);


    useEffect(() => {
        dispatch(getPhotos(page));
    }, [page, dispatch]);
    
    useEffect(() => {
        console.log(loadingPhotos);
    }, [loadingPhotos]);

    const handleNextPage = () => {
        setPage(page + 1);
        console.log('+ page')
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };




    return(
        <div className={styles.container}>
            <ul className={styles.sort_container}>
                <SortAllPhotos/>
            </ul>
            <div>
                <Cards/>
                {loadingPhotos ? <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center' }}><CircularProgress /></Box> : null}
                <button onClick={handlePrevPage}>Previous Page</button>
                <button onClick={handleNextPage}>Next Page</button>
            </div>
        </div>
    )
}