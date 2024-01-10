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
import { AppDispatch, useAppSelectorType } from "@/redux/store/store";
import { getFavoritPhoto, getPhotos, setPage, setSearchValue } from "@/redux/reducers/gallery";
import search from '../../../public/search.png'
import { usePathname, useRouter } from "next/navigation";
import { loginStateSwitch, removeUser } from "@/redux/reducers/authorisation";
import { auth, dbFirebase } from "@/services/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export const Header = () => {

    const dispatch = useDispatch<AppDispatch>()

    const router = useRouter()

    const loginState = useAppSelectorType((state)=>state.auth.logState)

    const [scrolled, setScrolled] = useState<boolean>(false);

    const [searchTerm, setSearchTerm] = useState<string>('');

    const [mainPage, checkMainPage] = useState<boolean>(false)

    const user = useAppSelectorType((state) => state.auth.user)

     const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
      };


      useEffect(() => {
        if(loginState){
            const photomsRef = doc(dbFirebase, "favorits", user?.uid)
            const getFavData = onSnapshot(photomsRef, (photo) =>{
                if(photo.exists()){
                    const photoData = photo.data()
                    dispatch(getFavoritPhoto({ photoData }))
                    console.log("Документ пришёл")
                    console.log(photoData)
                    
                }else{
                    console.log("No Items in db");
                }
            })
            return () => {
                getFavData();
            }
        }
    
    }, [loginState, dispatch, user?.uid]);


    
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

    const handleLogin =  () => {
      router.push("/Login")
    }

    const handleLogout =  async () => {
      router.push("/Login")
      try {
        await auth.signOut();
        if (loginState === true) {
          dispatch(loginStateSwitch(false));
          dispatch(removeUser());
        }
      } catch (error) {
        console.error('Ошибка при разлогинивании:', error);
      }
    }

    

    const pathname = usePathname()
    useEffect(()=>{
      console.log(pathname)
       if(pathname === '/'){
        checkMainPage(true)
       }else{
        checkMainPage(false)
       }
    },[pathname])

    return (
        <div className={!scrolled ? styles.header_container : styles.header_Scrolled}>
            <div>
                <Link href='/' ><Image src={ logo } style={{ width:'80px', height:'60px' }} alt="Logo"/></Link>
            </div>
            <div className={styles.header_left}>
                {HeaderLinkData.map((item, index)=>(
                    <NavLink item={item} key={index}/>
                    ))}
                {!loginState ?<button onClick={handleLogin} className={styles.login_button}>Login</button>
                : <button onClick={handleLogout} className={styles.login_button}>Logout</button>}
            </div>
            <div className={styles.container_search}> 
              
            { mainPage ?<button onClick={handleSearch}><Image alt="search" src={search} width={30}/></button>  : null }          
              { mainPage ? <TextField 
              fullWidth label="Search"
              type="search" 
              id="fullWidth"
              value={searchTerm}
              onChange={handleSearchChange}            
              onKeyDown={handleKeyDown}
              style={{ width: '300px', height: '50px', margin: '0 30px 0 30px' }}/> : null }
            </div>
        </div>
    )
}