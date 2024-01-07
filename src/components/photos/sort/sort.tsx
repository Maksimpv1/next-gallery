'use client'

import { SortAllData } from "./sortData"

import styles from './sort.module.css'
import { useState } from "react"


export const SortAllPhotos = () => {
    const [btnActive, setBtnActive] = useState<number>(0)

    const handleClick = (item:number) => {
        setBtnActive(item)
    }

    return(
        <>
            {SortAllData.map((item, index) =>(
                <button 
                className={`${styles.handle__sort} ${btnActive === item.active ? styles.active : ''}`}
                key={index} 
                onClick={() => handleClick(item.active)}>{item.name}</button>
            ))}
        </>
    )
}