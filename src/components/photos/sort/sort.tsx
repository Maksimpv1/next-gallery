import { SortAllData } from "./sortData"
import styles from './sort.module.css'
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch, useAppSelectorType } from "@/redux/store/store"
import { getPhotos, setPage, setSearchValue } from "@/redux/reducers/gallery"

export const SortAllPhotos = () => {
    const [btnActive, setBtnActive] = useState<number>(0);

    const [querValue, setQuerValue] = useState<string>('all');

    const page = useAppSelectorType((state)=> state.gallery.pageNumber)

    const dispatch = useDispatch<AppDispatch>();

    const handleClick = (item: number, name: string) => {        
        dispatch(setSearchValue(name))
        setBtnActive(item);
        setQuerValue(name);
        dispatch(setPage(0))
        dispatch(getPhotos({ page: 1}));
        
    }

    useEffect(() => {
        dispatch(setSearchValue(querValue))
        dispatch(getPhotos({ page: page }));
    }, [page, dispatch]);

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