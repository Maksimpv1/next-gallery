import { SortAllData } from "./sortData"
import styles from './sort.module.css'
import { useState } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store/store"
import { getPhotos } from "@/redux/reducers/gallery"

interface ISortAllPhotos {
    currentPage: number;
}


export const SortAllPhotos = (props: ISortAllPhotos) => {
    const [btnActive, setBtnActive] = useState<number>(0);
    const dispatch = useDispatch<AppDispatch>();

    const handleClick = (item: number, name: string) => {
        setBtnActive(item);
        if (name === 'Cброс') {
            dispatch(getPhotos({ page: props.currentPage, sortValue: 'defaultSortValue' }));
        } else {
            dispatch(getPhotos({ page: props.currentPage, sortValue: name }));
        }
    }

    return (
        <>
            {SortAllData.map((item, index) => (
                <button
                    className={`${styles.handle__sort} ${btnActive === item.active ? styles.active : ''}`}
                    key={index}
                    onClick={() => handleClick(item.active, item.sortValue)}>{item.name}</button>
            ))}
        </>
    )
}