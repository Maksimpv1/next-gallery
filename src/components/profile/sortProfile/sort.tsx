'use client'

import styles from './sort.module.css'
import { SortProfileValue } from "./sort.Data"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store/store';
import { sortProfile } from '@/redux/reducers/gallery';

export const SortAllPhotos = () => {
    const [btnActive, setBtnActive] = useState<number>(0);

    const dispatch = useDispatch<AppDispatch>()

    const handleClick = (item: number, name: string) => {  
        setBtnActive(item);
        dispatch(sortProfile(name))        
    }

    

    return (
        <>
            {SortProfileValue.map((item, index) => (
                <button
                className={`${styles.handle__sort} ${btnActive == item.active ? styles.active : ''}`}
                key={index}
                onClick={() => handleClick(item.active, item.sortValue)}
                >{item.name}</button>
            ))}
        </>
    )
}