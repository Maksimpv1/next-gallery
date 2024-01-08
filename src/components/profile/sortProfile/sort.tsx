'use client'

import styles from './sort.module.css'
import { SortProfileValue } from "./sort.Data"
import { useState } from 'react';

export const SortAllPhotos = () => {
    const [btnActive, setBtnActive] = useState<number>(0);

    const handleClick = (item: number, name: string) => {  
        setBtnActive(item);
        
    }

    return (
        <>
            {SortProfileValue.map((item, index) => (
                <button
                    className={`${styles.handle__sort} ${btnActive === item.active ? styles.active : ''}`}
                    key={index}
                    onClick={() => handleClick(item.active, item.sortValue)}
                    >{item.name}</button>
            ))}
        </>
    )
}