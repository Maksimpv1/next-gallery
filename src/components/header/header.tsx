'use client'

import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react"
import Image from 'next/image';
import { TextField } from "@mui/material"
import logo from '../../../public/logo.jpg'

import { NavLink } from "./navLinks/navLink"
import styles from "./header.module.css"
import { HeaderLinkData } from "./headerLinkDate";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { getPhotos, setPage, setSearchValue } from "@/redux/reducers/gallery";
import search from '../../../public/search.png'

export const Header = () => {

    const dispatch = useDispatch<AppDispatch>()

    const [active, setActive] = useState<string>("")
    const [toggle, setToggle] = useState<boolean>(false)

    const [logValue, setLog] = useState<boolean>(false)

    const [scrolled, setScrolled] = useState<boolean>(false);

    const [searchTerm, setSearchTerm] = useState<string>('');

     const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
      };
    
    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter') {
        dispatch(setSearchValue(searchTerm))
        dispatch(getPhotos({ page: 1 }))
        dispatch(setPage(0))
        setSearchTerm('Search')

      }
    };

    const handleSearch = () => {  
      dispatch(setSearchValue(searchTerm))    
      dispatch(getPhotos({ page: 1 }))      
      dispatch(setPage(0))
      setSearchTerm('Search')
    }

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 100) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      };
  
        window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    return (
        <div className={!scrolled ? styles.header_container : styles.header_Scrolled}>
            <div>
                <Link href='/' ><Image src={ logo } style={{ width:'80px', height:'60px' }} alt="Logo"/></Link>
            </div>
            <div className={styles.header_left}>
                {HeaderLinkData.map((item, index)=>(
                    <NavLink item={item} key={index}/>
                    ))}
                {!logValue ? <button className={styles.login_button}>Login</button>
                : <button className={styles.login_button}>Logout</button>}
            </div>
            <div className={styles.container_search}> 
              <button onClick={handleSearch}><Image alt="search" src={search} width={30}/></button>              
              <TextField 
              fullWidth label="Search"
              type="search" 
              id="fullWidth"
              value={searchTerm}
              onChange={handleSearchChange}            
              onKeyDown={handleKeyDown}
              style={{ width: '300px', height: '50px', margin: '0 30px 0 30px' }}/>
            </div>
        </div>
    )
}