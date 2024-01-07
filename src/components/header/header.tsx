'use client'

import { useEffect, useState } from "react"
import Image from 'next/image';
import { TextField } from "@mui/material"
import logo from '../../../public/logo.jpg'

import { NavLink } from "./navLinks/navLink"
import styles from "./header.module.css"
import { HeaderLinkData } from "./headerLinkDate";
import Link from "next/link";

export const Header = () => {
    const [active, setActive] = useState<string>("")
    const [toggle, setToggle] = useState<boolean>(false)

    const [logValue, setLog] = useState<boolean>(false)

    const [scrolled, setScrolled] = useState(false);

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
            <TextField fullWidth label="Search" id="fullWidth" style={{ width: '300px', height: '50px', margin: '0 30px 0 30px' }}/>
        </div>
    )
}